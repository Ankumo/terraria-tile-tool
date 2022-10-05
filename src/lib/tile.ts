import { BinaryReader } from './binaryReader';
import { ETileID, EWallID } from './enums';

export class Tile {
    public type = 0;
    public wall = 0;
    public liquid = 0;
    public sTileHeader = 0;
    public bTileHeader = 0;
    public bTileHeader2 = 0;
    public bTileHeader3 = 0;
    public frameX = 0;
    public frameY = 0;
    public copies = 0;

    readonly solidTiles = [
        0, 1, 2, 6, 7, 8, 9, 10, 19, 22, 23, 25, 30, 37, 38, 39, 40, 41, 43, 44,
        45, 46, 47, 48, 53, 54, 56, 57, 58, 59, 60, 63, 64, 65, 66, 67, 68, 70,
        75, 76, 107, 108, 109, 111, 112, 116, 117, 118, 119, 120, 121, 122, 123,
        127, 130, 137, 138, 140, 145, 146, 147, 148, 150, 151, 152, 153, 154,
        155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 166, 167, 168, 169,
        170, 175, 176, 177, 179, 180, 181, 182, 183, 188, 189, 190, 191, 192,
        193, 194, 195, 196, 197, 198, 199, 200, 202, 203, 204, 206, 208, 211,
        221, 222, 223, 224, 225, 226, 229, 230, 232, 234, 235, 239, 248, 249,
        250, 251, 252, 253, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264,
        265, 266, 267, 268, 272, 273, 274, 284, 311, 312, 313, 315, 321, 322,
        325, 326, 327, 328, 329, 345, 346, 347, 348, 350, 357, 367, 368, 369,
        370, 371, 379, 380, 381, 383, 384, 385, 387, 388, 396, 397, 398, 399,
        400, 401, 402, 403, 404, 407, 408, 409, 415, 416, 417, 418, 421, 422,
        426, 427, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 446, 447,
        448, 458, 459, 460, 472, 473, 474, 476, 477, 478, 479, 481, 482, 483,
        484, 492, 495, 496, 498, 500, 501, 502, 503, 507, 508, 512, 513, 514,
        515, 516, 517, 534, 535, 536, 537, 539, 540, 541, 546, 557, 562, 563,
        566, 618, 625, 626, 627, 628, 633, 635, 641, 659, 661, 662, 664, 666,
        667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680,
        681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692,
    ];

    constructor(private worldFileVersion: number, copy?: Tile) {
        if (copy) {
            Object.assign(this, copy);
        }
    }

    get liquidType() {
        return (this.bTileHeader & 0x60) >> 5;
    }

    set liquidType(val) {
        switch (val) {
            case 0:
                this.bTileHeader &= 159;
                break;
            case 1:
                this.lava = true;
                break;
            case 2:
                this.honey = true;
                break;
        }
    }

    get slope() {
        return (this.sTileHeader & 0x7000) >> 12;
    }

    set slope(val) {
        this.sTileHeader = (this.sTileHeader & 0x8fff) | ((val & 7) << 12);
    }

    get halfBrick() {
        return (this.sTileHeader & 0x400) === 1024;
    }

    set halfBrick(val) {
        if (val) {
            this.sTileHeader |= 1024;
        } else {
            this.sTileHeader &= 0xfbff;
        }
    }

    get active() {
        return (this.sTileHeader & 0x20) === 32;
    }

    set active(val) {
        if (val) {
            this.sTileHeader |= 32;
        } else {
            this.sTileHeader &= 0xffdf;
        }
    }

    get color() {
        return this.sTileHeader & 0x1f;
    }

    set color(val) {
        this.sTileHeader = (this.sTileHeader & 0xffe0) | val;
    }

    get inActive() {
        return (this.sTileHeader & 0x40) === 64;
    }

    set inActive(val) {
        if (val) {
            this.sTileHeader |= 64;
        } else {
            this.sTileHeader &= 0xffbf;
        }
    }

    get wire() {
        return (this.sTileHeader & 0x80) === 128;
    }

    set wire(val) {
        if (val) {
            this.sTileHeader |= 128;
        } else {
            this.sTileHeader &= 0xff7f;
        }
    }

    get wire2() {
        return (this.sTileHeader & 0x100) === 256;
    }

    set wire2(val) {
        if (val) {
            this.sTileHeader |= 256;
        } else {
            this.sTileHeader &= 0xfeff;
        }
    }

    get wire3() {
        return (this.sTileHeader & 0x200) === 512;
    }

    set wire3(val) {
        if (val) {
            this.sTileHeader |= 512;
        } else {
            this.sTileHeader &= 0xfdff;
        }
    }

    get wire4() {
        return (this.bTileHeader & 0x80) === 128;
    }

    set wire4(val) {
        if (val) {
            this.bTileHeader |= 128;
        } else {
            this.bTileHeader &= 127;
        }
    }

    get actuator() {
        return (this.sTileHeader & 0x800) === 2048;
    }

    set actuator(val) {
        if (val) {
            this.sTileHeader |= 2048;
        } else {
            this.sTileHeader &= 0xf7ff;
        }
    }

    get skipLiquid() {
        return (this.bTileHeader3 & 0x10) === 16;
    }

    set skipLiquid(val) {
        if (val) {
            this.bTileHeader3 |= 16;
        } else {
            this.bTileHeader3 &= 239;
        }
    }

    get checkingLiquid() {
        return (this.bTileHeader3 & 8) === 8;
    }

    set checkingLiquid(val) {
        if (val) {
            this.bTileHeader3 |= 8;
        } else {
            this.bTileHeader3 &= 247;
        }
    }

    get wallFrameY() {
        return (this.bTileHeader3 & 7) * 36;
    }

    set wallFrameY(val) {
        this.bTileHeader3 = (this.bTileHeader3 & 0xf8) | ((val / 36) & 7);
    }

    get wallFrameNumber() {
        return (this.bTileHeader2 & 0xc0) >> 6;
    }

    set wallFrameNumber(val) {
        this.bTileHeader2 = (this.bTileHeader2 & 0x3f) | ((val & 3) << 6);
    }

    get frameNumber() {
        return (this.bTileHeader2 & 0x30) >> 4;
    }

    set frameNumber(val) {
        this.bTileHeader2 = (this.bTileHeader2 & 0xcf) | ((val & 3) << 4);
    }

    get wallFrameX() {
        return (this.bTileHeader2 & 0xf) * 36;
    }

    set wallFrameX(val) {
        this.bTileHeader2 = (this.bTileHeader2 & 0xf0) | ((val / 36) & 0xf);
    }

    get honey() {
        return (this.bTileHeader & 0x40) === 64;
    }

    set honey(val) {
        if (val) {
            this.bTileHeader = (this.bTileHeader & 0x9f) | 0x40;
        } else {
            this.bTileHeader &= 191;
        }
    }

    get lava() {
        return (this.bTileHeader & 0x20) === 32;
    }

    set lava(val) {
        if (val) {
            this.bTileHeader = (this.bTileHeader & 0x9f) | 0x20;
        } else {
            this.bTileHeader &= 223;
        }
    }

    get shimmer() {
        return (this.bTileHeader & 0x60) === 96;
    }

    set shimmer(val) {
        if (val) {
            this.bTileHeader = (this.bTileHeader & 0x9f) | 0x60;
        } else {
            this.bTileHeader &= 159;
        }
    }

    get wallColor() {
        return this.bTileHeader & 0x1f;
    }

    set wallColor(val) {
        this.bTileHeader = (this.bTileHeader & 0xe0) | val;
    }

    get rightSlope() {
        const s = this.slope;
        return s !== 1 ? s === 3 : true;
    }

    get leftSlope() {
        const s = this.slope;
        return s !== 2 ? s === 4 : true;
    }

    get bottomSlope() {
        const s = this.slope;
        return s !== 3 ? s === 4 : true;
    }

    get topSlope() {
        const s = this.slope;
        return s !== 1 ? s === 2 : true;
    }

    get nactive() {
        return (this.sTileHeader & 0x60) === 32;
    }

    get blockType() {
        if (this.halfBrick) {
            return 1;
        }

        const s = this.slope;
        return s > 0 ? s + 1 : s;
    }

    get isSolid() {
        return this.solidTiles.includes(this.type);
    }

    get isCleared() {
        return (
            this.slope === 0 &&
            !this.active &&
            !this.halfBrick &&
            !this.inActive
        );
    }

    get normalizedType() {
        return this.type === 0 ? (this.isCleared ? -1 : 0) : this.type;
    }

    get invisibleBlock() {
        return (this.bTileHeader3 & 0x20) === 32;
    }

    set invisibleBlock(val) {
        if (val) {
            this.bTileHeader3 |= 32;
        } else {
            this.bTileHeader3 &= 0xffffffdf;
        }
    }

    get invisibleWall() {
        return (this.bTileHeader3 & 0x40) === 64;
    }

    set invisibleWall(val) {
        if (val) {
            this.bTileHeader3 |= 64;
        } else {
            this.bTileHeader3 &= 0xffffffbf;
        }
    }

    get fullbrightBlock() {
        return (this.bTileHeader3 & 0x80) === 128;
    }

    set fullbrightBlock(val) {
        if (val) {
            this.bTileHeader3 |= 128;
        } else {
            this.bTileHeader3 &= 0xffffff7f;
        }
    }

    get fullbrightWall() {
        return (this.sTileHeader & 0x8000) === 32768;
    }

    set fullbrightWall(val) {
        if (val) {
            this.sTileHeader |= 32768;
        } else {
            this.sTileHeader &= 0xffff7fff;
        }
    }

    clone() {
        const copy = new Tile(this.worldFileVersion);
        copy.copyFrom(this);

        return copy;
    }

    clearEverything() {
        this.type = 0;
        this.wall = 0;
        this.liquid = 0;
        this.sTileHeader = 0;
        this.bTileHeader = 0;
        this.bTileHeader2 = 0;
        this.bTileHeader3 = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.copies = 0;
    }

    clearTile() {
        this.slope = 0;
        this.halfBrick = false;
        this.active = false;
        this.inActive = false;
    }

    copyFrom(tile: Tile) {
        Object.assign(this, tile);
    }

    isTheSameAs(tile: Tile | null, imp: boolean[]): boolean {
        if (
            tile === null ||
            this.sTileHeader !== tile.sTileHeader ||
            (this.active &&
                (this.type !== tile.type ||
                    (imp[this.type] &&
                        (this.frameX !== tile.frameX ||
                            this.frameY !== tile.frameY)))) ||
            this.wall !== tile.wall ||
            this.liquid !== tile.liquid
        ) {
            return false;
        }

        if (tile.liquid === 0) {
            if (
                this.wallColor !== tile.wallColor ||
                this.wire4 !== tile.wire4
            ) {
                return false;
            }
        } else if (this.bTileHeader !== tile.bTileHeader) {
            return false;
        }

        return true;
    }

    resetToType(type: number) {
        this.clearMetadata();
        this.sTileHeader = 32;
        this.type = type;
    }

    clearMetadata() {
        this.liquid = 0;
        this.sTileHeader = 0;
        this.bTileHeader = 0;
        this.bTileHeader2 = 0;
        this.bTileHeader3 = 0;
        this.frameX = 0;
        this.frameY = 0;
    }

    read(r: BinaryReader, imp: boolean[]) {
        this.clearEverything();

        let type = -1,
            ch = 0,
            wh = 0,
            nh = 0;

        const sh = r.readByte();

        if ((sh & 1) === 1) {
            wh = r.readByte();

            if ((wh & 1) === 1) {
                ch = r.readByte();

                if ((ch & 1) === 1) {
                    nh = r.readByte();
                }
            }
        }

        let lh: number;

        if ((sh & 2) === 2) {
            this.active = true;

            if ((sh & 0x20) === 32) {
                lh = r.readByte();
                type = (r.readByte() << 8) | lh;
            } else {
                type = r.readByte();
            }

            this.type = type;

            if (imp[type]) {
                this.frameX = r.readInt16();
                this.frameY = r.readInt16();

                if (this.type === ETileID.Timers) {
                    this.frameY = 0;
                }
            } else {
                this.frameX = -1;
                this.frameY = -1;
            }

            if ((ch & 8) === 8) {
                this.color = r.readByte();
            }
        }

        if ((sh & 4) === 4) {
            this.wall = r.readByte();

            if (this.wall >= EWallID.Count) {
                this.wall = 0;
            }

            if ((ch & 0x10) === 16) {
                this.wallColor = r.readByte();
            }
        }

        lh = (sh & 0x18) >> 3;

        if (lh !== 0) {
            this.liquid = r.readByte();

            if ((ch & 0x80) === 128) {
                this.shimmer = true;
            } else if (lh > 1) {
                this[lh === 2 ? 'lava' : 'honey'] = true;
            }
        }

        if (wh > 1) {
            if ((wh & 2) === 2) {
                this.wire = true;
            }

            if ((wh & 4) === 4) {
                this.wire2 = true;
            }

            if ((wh & 8) === 8) {
                this.wire3 = true;
            }

            lh = (wh & 0x70) >> 4;

            if (
                lh !== 0 &&
                (this.isSolid ||
                    this.type === ETileID.InactiveStoneBlock ||
                    this.type === ETileID.ChimneySmoke)
            ) {
                if (lh === 1) {
                    this.halfBrick = true;
                } else {
                    this.slope = lh - 1;
                }
            }
        }

        if (ch > 1) {
            if ((ch & 2) === 2) {
                this.actuator = true;
            }

            if ((ch & 4) === 4) {
                this.inActive = true;
            }

            if ((ch & 0x20) === 32) {
                this.wire4 = true;
            }

            if ((ch & 0x40) === 64) {
                this.wall = (r.readByte() << 8) | this.wall;

                if (this.wall >= EWallID.Count) {
                    this.wall = 0;
                }
            }
        }

        if (nh > 1) {
            if ((nh & 2) === 2) {
                this.invisibleBlock = true;
            }

            if ((nh & 4) === 4) {
                this.invisibleWall = true;
            }

            if ((nh & 8) === 8) {
                this.fullbrightBlock = true;
            }

            if ((nh & 0x10) === 16) {
                this.fullbrightWall = true;
            }
        }

        switch ((sh & 0xc0) >> 6) {
            case 0:
                this.copies = 0;
                break;
            case 1:
                this.copies = r.readByte();
                break;
            default:
                this.copies = r.readInt16();
                break;
        }
    }

    write(buf: Uint8Array, imp: boolean[]) {
        let th = this.worldFileVersion >= 269 ? 4 : 3,
            ch = 0,
            wh = 0,
            wallh = 0,
            nh = 0;

        if (this.active) {
            wallh |= 2;
            buf[th++] = this.type;

            if (this.type > 255) {
                buf[th++] = this.type >> 8;
                wallh |= 0x20;
            }

            if (imp[this.type]) {
                buf[th++] = this.frameX & 0xff;
                buf[th++] = (this.frameX & 0xff00) >> 8;

                buf[th++] = this.frameY & 0xff;
                buf[th++] = (this.frameY & 0xff00) >> 8;
            }

            if (this.color !== 0) {
                ch |= 8;
                buf[th++] = this.color;
            }
        }

        if (this.wall !== 0) {
            wallh |= 4;
            buf[th++] = this.wall;

            if (this.wallColor !== 0) {
                ch |= 0x10;
                buf[th++] = this.wallColor;
            }
        }

        if (this.liquid !== 0) {
            if (!this.shimmer) {
                wallh = this.lava
                    ? wallh | 0x10
                    : !this.honey
                    ? wallh | 8
                    : wallh | 0x18;
            } else {
                ch |= 0x80;
                wallh |= 8;
            }

            buf[th++] = this.liquid;
        }

        if (this.wire) {
            wh |= 2;
        }

        if (this.wire2) {
            wh |= 4;
        }

        if (this.wire3) {
            wh |= 8;
        }

        const slopeh = this.halfBrick
            ? 16
            : this.slope !== 0
            ? (this.slope + 1) << 4
            : 0;
        wh |= slopeh;

        if (this.actuator) {
            ch |= 2;
        }

        if (this.inActive) {
            ch |= 4;
        }

        if (this.wire4) {
            ch |= 0x20;
        }

        if (this.wall > 255) {
            buf[th++] = this.wall >> 8;
            ch |= 0x40;
        }

        if (this.invisibleBlock) {
            nh |= 2;
        }

        if (this.invisibleWall) {
            nh |= 4;
        }

        if (this.fullbrightBlock) {
            nh |= 8;
        }

        if (this.fullbrightWall) {
            nh |= 0x10;
        }

        let offset = this.worldFileVersion >= 269 ? 3 : 2;

        if (nh !== 0) {
            ch |= 1;
            buf[offset--] = nh;
        }

        if (ch !== 0) {
            wh |= 1;
            buf[offset--] = ch;
        }

        if (wh !== 0) {
            wallh |= 1;
            buf[offset--] = wh;
        }

        if (this.copies > 0) {
            buf[th++] = this.copies & 0xff;

            if (this.copies > 255) {
                wallh |= 0x80;
                buf[th++] = (this.copies & 0xff00) >> 8;
            } else {
                wallh |= 0x40;
            }
        }

        buf[offset] = wallh;
        return buf.slice(offset, th);
    }
}
