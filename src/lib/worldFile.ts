import { BinaryReader } from './binaryReader';
import { BinaryWriter } from './binaryWriter';
import { wallOffset } from './constants';
import {
    EBranchType,
    ETileID,
    EWallID,
    EWorldCorrType,
    EWorldDifficulty,
    EWorldYType,
} from './enums';
import { Tile } from './tile';
import {
    SwapBranch,
    SwapLogicMeta,
    SwapMission,
    SwapMissionMeta,
    SwapTableSelection,
} from './types';

export class WorldFile {
    private _r: BinaryReader | null = null;

    public v = 0;
    public worldName = 'Unknown';
    public worldDifficulty = EWorldDifficulty.NORMAL;
    public creationDate = 'Unknown';
    public worldCorr = EWorldCorrType.CORRUPTION;
    public isCrimson = false;
    public capX = 0;

    private _capY = 0;
    private _surfaceLayer = 0;
    private _rockLayer = 0;
    private _imp: boolean[] = [];
    private _pos: number[] = [];
    private _tilesData: BinaryWriter | null = null;

    readonly _rlFormat = [114, 101, 108, 111, 103, 105, 99, 2].join(' ');

    constructor(public file: File) {}

    get fields(): WorldFile {
        const keys = Object.keys(this).filter((k) => !k.startsWith('_'));

        const result: any = {};

        keys.forEach((k) => (result[k] = (this as any)[k]));

        return result;
    }

    get _skyLayer(): number {
        return this._surfaceLayer * 0.34999999403953552;
    }

    get _cap(): number {
        return this.capX * this._capY;
    }

    getReader() {
        return new Promise<BinaryReader>((r, rj) => {
            let fr: FileReader | null = new FileReader();

            fr.onerror = () => {
                rj('Unable to load file');
            };

            fr.onload = () => {
                const br = new BinaryReader(fr!.result as ArrayBuffer);
                fr = null;
                r(br);
            };

            fr.readAsArrayBuffer(this.file);
        });
    }

    async load(): Promise<Error | string | WorldFile> {
        try {
            const r = await this.getReader();

            this.v = r.readInt32();

            if (this.v < 209) {
                throw `This world file version is too old (${this.v})`;
            }

            const format = r.readBytes('ulong');

            if (format.join(' ') !== this._rlFormat) {
                throw `This world file is not in valid Re-Logic format`;
            }

            r.skip(['uint', 'ulong']);

            const posN = r.readInt16();
            this._pos = [];

            for (let i = 0; i < posN; i++) {
                this._pos.push(r.readInt32());
            }

            const impN = r.readInt16();
            this._imp = [];

            let left = 0,
                right = 128;

            for (let i = 0; i < impN; i++) {
                if (right === 128) {
                    left = r.readByte();
                    right = 1;
                } else {
                    right <<= 1;
                }

                this._imp.push((left & right) === right);
            }

            this.worldName = r.readString();

            r.readString();
            r.skip(['ulong', 'decimal', ['int', 5]]);

            this._capY = r.readInt32();
            this.capX = r.readInt32();
            this.worldDifficulty = r.readInt32();

            let bSkips = 0;

            [222, 227, 238, 239, 241].forEach((v) => {
                if (this.v >= v) {
                    bSkips++;
                }
            });

            r.skip([['boolean', bSkips]]);

            this.creationDate = r.readDate();

            r.skip(['byte', ['int', 19]]);

            this._surfaceLayer = r.readDouble();
            this._rockLayer = r.readDouble();

            r.skip([
                'double',
                'boolean',
                'int',
                'boolean',
                'boolean',
                'int',
                'int',
            ]);

            this.isCrimson = r.readBoolean();

            r.skip([['boolean', 20], 'byte', 'int']);

            const hardMode = r.readBoolean();

            if (this.isCrimson) {
                this.worldCorr = hardMode
                    ? EWorldCorrType.HALLOW_CRIMSON
                    : EWorldCorrType.CRIMSON;
            } else {
                this.worldCorr = hardMode
                    ? EWorldCorrType.HALLOW_CORRUPTION
                    : EWorldCorrType.CORRUPTION;
            }

            this._r = r;
            return this.fields;
        } catch (err) {
            return err as any;
        }
    }

    process(swaps: SwapMission[], callback: (prec: number) => void) {
        return new Promise<void>((rs, rj) => {
            try {
                if (!this._r) {
                    throw 'Not readable';
                }

                this._r.offset = this._pos[1];

                const tile = new Tile();

                this._tilesData = new BinaryWriter(this._r.length * 3);

                const buf = new Uint8Array(15);

                const swapsMeta = this.prepareSwapsMeta(swaps);
                const map = this.createTileMap(swapsMeta, callback);

                const startPrec = map.length > 0 ? 25 : 0;
                const precScale = 100 - startPrec;

                let count = 0,
                    prec = startPrec;

                for (let x = 0; x < this.capX; x++) {
                    for (let y = 0; y < this._capY; y++) {
                        tile.read(this._r, this._imp);

                        const unpackCount = tile.copies + 1;

                        let i = tile.copies;

                        const reverseData: Tile[] = [];

                        let prevTile: Tile | null = null;

                        do {
                            const tileCopy = tile.clone();
                            tileCopy.copies = 0;

                            this.processTile(
                                tileCopy,
                                swapsMeta,
                                x,
                                y + i,
                                map,
                            );

                            if (!tileCopy.isTheSameAs(prevTile, this._imp)) {
                                reverseData.splice(0, 0, tileCopy);
                            } else {
                                reverseData[0].copies++;
                            }

                            prevTile = tileCopy;
                            i--;
                        } while (i >= 0);

                        for (const t of reverseData) {
                            const tileData = t.write(buf, this._imp);
                            this._tilesData.writeBytes(tileData);
                        }

                        count += unpackCount;

                        const curPrec =
                            Math.floor((count / this._cap) * precScale) +
                            startPrec;

                        if (curPrec > prec) {
                            prec = curPrec;
                            callback(prec);
                        }

                        y += unpackCount - 1;
                    }
                }

                rs();
            } catch (err) {
                rj(err);
            }
        });
    }

    createTileMap(
        swaps: SwapMissionMeta[],
        callback: (prec: number) => void,
    ): Array<number[][]> {
        const need = swaps.some((s) => s.withinBranch);

        if (!need) {
            return [];
        }

        const result: Array<number[][]> = [];

        const tile = new Tile();

        let count = 0,
            prec = 0;

        for (let x = 0; x < this.capX; x++) {
            result.push([]);
            for (let y = 0; y < this._capY; y++) {
                tile.read(this._r!, this._imp);

                for (let i = 0; i < tile.copies + 1; i++) {
                    result[x].push([tile.normalizedType, tile.wall]);
                }

                count += tile.copies + 1;

                const curPrec = Math.floor((count / this._cap) * 25);

                if (curPrec > prec) {
                    prec = curPrec;
                    callback(prec);
                }

                y += tile.copies;
            }
        }

        this._r!.offset = this._pos[1];

        return result;
    }

    processTile(
        tile: Tile,
        swaps: SwapMissionMeta[],
        x: number,
        y: number,
        map: Array<number[][]>,
    ) {
        for (const s of swaps) {
            const logicT = s.logicT[tile.normalizedType];
            if (logicT?.length > 0) {
                const foundLogic = this.checkBranches(tile, logicT, x, y, map);

                if (foundLogic) {
                    foundLogic.picker(tile);
                }
            }

            const logicW = s.logicW[tile.wall];
            if (logicW?.length > 0) {
                const foundLogic = this.checkBranches(tile, logicW, x, y, map);

                if (foundLogic) {
                    foundLogic.picker(tile);
                }
            }
        }
    }

    checkBranches(
        tile: Tile,
        logicList: SwapLogicMeta[],
        x: number,
        y: number,
        map: Array<number[][]>,
    ): SwapLogicMeta | undefined {
        for (const l of logicList) {
            if (!l.branches || l.branches.length === 0) {
                return l;
            }

            let activeBranch: SwapBranch | null = null;

            try {
                const compiledBranches = l.branches.map((b) => {
                    activeBranch = b;

                    switch (b.type) {
                        case EBranchType.ABOVE_X:
                            return x > b.payload;
                        case EBranchType.ABOVE_Y:
                            if (b.payload < 0) {
                                const enumValue = -b.payload - 1;
                                return this.calculateY(y) < enumValue;
                            } else {
                                return y < b.payload;
                            }
                        case EBranchType.BELOW_Y:
                            if (b.payload < 0) {
                                const enumValue = -b.payload - 1;
                                return this.calculateY(y) > enumValue;
                            } else {
                                return y > b.payload;
                            }
                        case EBranchType.IN_Y:
                            return b.payload.includes(this.calculateY(y));
                        case EBranchType.BEYOND_X:
                            return x < b.payload;
                        case EBranchType.HAS_NEARBY_TILE:
                        case EBranchType.HAS_NEARBY_WALL:
                            const xStart =
                                x - b.payload.within < 0
                                    ? 0
                                    : x - b.payload.within;

                            const yStart =
                                y - b.payload.within < 0
                                    ? 0
                                    : y - b.payload.within;

                            const xEnd =
                                x + b.payload.within >= this.capX
                                    ? this.capX - 1
                                    : x + b.payload.within;

                            const yEnd =
                                y + b.payload.within >= this._capY
                                    ? this._capY - 1
                                    : y + b.payload.within;

                            const id =
                                b.payload.id -
                                (b.type === EBranchType.HAS_NEARBY_TILE
                                    ? 0
                                    : wallOffset);

                            const index =
                                b.type === EBranchType.HAS_NEARBY_TILE ? 0 : 1;

                            for (let _x = xStart; _x <= xEnd; _x++) {
                                for (let _y = yStart; _y <= yEnd; _y++) {
                                    if (
                                        map[_x][_y][index] === id &&
                                        (x !== _x || y !== _y)
                                    ) {
                                        return true;
                                    }
                                }
                            }

                            return false;
                    }
                });

                activeBranch = null;

                let cond = compiledBranches[0];

                for (let i = 1; i < compiledBranches.length; i++) {
                    if (l.branches[i].or) {
                        cond ||= compiledBranches[i];
                    } else {
                        cond &&= compiledBranches[i];
                    }
                }

                if (cond) {
                    return l;
                }
            } catch (err) {
                console.error(err);

                if (activeBranch !== null) {
                    console.log(activeBranch);
                }

                throw `Error: Checking branch ${
                    activeBranch !== null
                        ? EBranchType[(activeBranch as SwapBranch).type]
                        : 'unknown'
                } for tile [${x}, ${y}][${ETileID[tile.normalizedType]}|${
                    EWallID[tile.wall]
                }]`;
            }
        }
    }

    calculateY(y: number): EWorldYType {
        if (y > this._capY - 200) {
            return EWorldYType.UNDERWORLD;
        } else if (y > this._rockLayer) {
            return EWorldYType.CAVERNS;
        } else if (y > this._surfaceLayer) {
            return EWorldYType.UNDERGROUND;
        } else if (y > this._skyLayer) {
            return EWorldYType.SURFACE;
        } else {
            return EWorldYType.SPACE;
        }
    }

    createEntityPicker(table: Array<number[]>): (tile: Tile) => void {
        if (table.length === 0) {
            return () => false;
        }

        const humanTable = table.map((array) => {
            const humanValues: SwapTableSelection = {};

            if (array.length > 2) {
                humanValues.w = array[1] - wallOffset;
                humanValues.t = array[0];
            } else if (array[0] >= wallOffset) {
                humanValues.w = array[0] - wallOffset;
            } else {
                humanValues.t = array[0];
            }

            return [humanValues, array[array.length - 1]];
        });

        let pickAlgo = () => humanTable[0][0] as SwapTableSelection;

        if (humanTable.length > 1 || humanTable[0][1] !== 100) {
            humanTable.sort((a, b) => (a[1] < b[1] ? 1 : -1));

            let weights = [humanTable[0][1] as number];

            for (let i = 1; i < humanTable.length; i++) {
                weights.push(weights[i - 1] + (humanTable[i][1] as number));
            }

            weights = weights.map((w) => w / 100);

            pickAlgo = () => {
                let rand = Math.random();

                if (weights[weights.length - 1] > 1) {
                    rand *= weights[weights.length - 1];
                }

                const index = weights.findIndex((w) => rand <= w);

                return ~index
                    ? (humanTable[index][0] as SwapTableSelection)
                    : {};
            };
        }

        return (tile: Tile) => {
            const pick = pickAlgo();

            if (pick.t !== undefined) {
                if (pick.t < 0) {
                    tile.clearTile();
                } else {
                    tile.type = pick.t;
                }

                if (pick.w !== undefined) {
                    tile.wall = pick.w;
                }
            } else if (pick.w !== undefined) {
                tile.wall = pick.w;
            }
        };
    }

    prepareSwapsMeta(swaps: SwapMission[]): SwapMissionMeta[] {
        return swaps.map((m) => {
            const logicT: SwapMissionMeta['logicT'] = {};
            const logicW: SwapMissionMeta['logicW'] = {};
            let withinBranch = false;

            m.logic.forEach((l) => {
                if (l.target >= wallOffset) {
                    const wallTarget = l.target - wallOffset;
                    if (!logicW[wallTarget]) {
                        logicW[wallTarget] = [];
                    }

                    logicW[wallTarget].push({
                        ...l,
                        picker: this.createEntityPicker(l.table),
                    });
                } else {
                    if (!logicT[l.target]) {
                        logicT[l.target] = [];
                    }

                    logicT[l.target].push({
                        ...l,
                        picker: this.createEntityPicker(l.table),
                    });
                }

                if (l.branches) {
                    withinBranch = l.branches.some(
                        (b) =>
                            b.type === EBranchType.HAS_NEARBY_TILE ||
                            b.type === EBranchType.HAS_NEARBY_WALL,
                    );
                }
            });

            return {
                ...m,
                logicT,
                logicW,
                withinBranch,
            } as SwapMissionMeta;
        });
    }

    save(): ArrayBuffer | undefined {
        if (!this._r) {
            return;
        }

        const w = new BinaryWriter(this._r.length * 3);

        w.writeFrom(this._r, 0, this._pos[1]);

        w.writeBytes(this._tilesData!.bytes);

        let d = 0;

        if (this._pos[2] !== w.offset) {
            d = w.offset - this._pos[2];
        }

        w.writeFrom(this._r, this._pos[2], this._r.length - this._pos[2]);

        if (d !== 0) {
            for (let i = 2; i < this._pos.length; i++) {
                this._pos[i] += d;
            }

            w.offset = 0;
            w.writeInt32(this.v);
            w.offset += 20;
            w.writeInt16(this._pos.length);

            for (let i = 0; i < this._pos.length; i++) {
                w.writeInt32(this._pos[i]);
            }
        }

        return w.bytes;
    }

    saveBackup(): ArrayBuffer | undefined {
        return this._r?.buf;
    }
}
