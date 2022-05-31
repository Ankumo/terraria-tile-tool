import {
    EBiome,
    EBranchType,
    EMoonPhase,
    EMoonStyle,
    ESunStyle,
    ETileID,
    EWallID,
} from './enums';
import { Tile } from './tile';
import { WorldFile } from './worldFile';

export type CSTypes =
    | 'sbyte'
    | 'byte'
    | 'int'
    | 'uint'
    | 'long'
    | 'ulong'
    | 'short'
    | 'ushort'
    | 'boolean'
    | 'decimal'
    | 'float'
    | 'double'
    | 'char';

export type CSTypesSet = [CSTypes, number];

export type BGState = {
    nightMode: boolean;
    biome: EBiome;
    style: number;
    sun: ESunStyle;
    moon: {
        phase: EMoonPhase;
        style: EMoonStyle;
    };
    paused: boolean;
    anim: boolean;
};

export type SpriteInfo = {
    pad?: number;
    count?: number;
    single?: boolean;
    src?: string;
    delay?: number;
    scale?: number;
    offset?: number;
    flip?: boolean;
};

export type DNFilters = {
    d?: string;
    n?: string;
};

export type BiomeInfo = {
    sets: Array<number[]>;
    skyF?: DNFilters;
    cloudsF?: DNFilters;
    f?: DNFilters;
};

export type Star = {
    scale: number;
    x: number;
    y: number;
    type: number;
    delayScale: number;
    delayRotate: number;
};

export interface TypePayload<T, P> {
    type: T;
    payload: P;
}

export interface BranchTypePayload<T, P> extends TypePayload<T, P> {
    or?: true;
}

export type SwapBranch =
    | BranchTypePayload<
          | EBranchType.ABOVE_X
          | EBranchType.ABOVE_Y
          | EBranchType.BELOW_Y
          | EBranchType.BEYOND_X,
          number
      >
    | BranchTypePayload<EBranchType.IN_Y, number[]>
    | BranchTypePayload<
          EBranchType.HAS_NEARBY_WALL | EBranchType.HAS_NEARBY_TILE,
          { id: number; within: number }
      >;

export type SwapLogic = {
    target: number;
    branches?: SwapBranch[];
    table: Array<number[]>;
    name: string;
};

export type SwapLogicMeta = SwapLogic & {
    picker: (tile: Tile) => void;
};

export type SwapMission = {
    name: string;
    logic: SwapLogic[];
    icon: number;
};

export type SwapMissionMeta = SwapMission & {
    logicT: Record<number, SwapLogicMeta[]>;
    logicW: Record<number, SwapLogicMeta[]>;
    withinBranch: boolean;
};

export type IconBtns = 'delete' | 'rename' | 'export';

export type SwapTableSelection = {
    w?: EWallID;
    t?: ETileID;
};

export type WorldFileWorkerInMessage =
    | TypePayload<'init', File>
    | TypePayload<'process', SwapMission[]>
    | TypePayload<'save' | 'saveBackup', undefined>;

export type WorldFileWorkerOutMessage =
    | TypePayload<'done', undefined>
    | TypePayload<'progress', number>
    | TypePayload<'error', string | Error>
    | TypePayload<'loaded', string | Error | WorldFile>
    | TypePayload<'save' | 'saveBackup', ArrayBuffer | undefined>;
