import { BinaryWriter } from './binaryWriter';
import { wallOffset } from './constants';
import { EBranchType, ETileID, EWallID, EWorldYType } from './enums';
import { SwapLogic } from './types';

export const fromEnum = (_enum: { [key: number]: number | string }) => {
    const keys: number[] = Object.keys(_enum)
        .map((k) => parseInt(k))
        .filter((k) => !isNaN(k));

    keys.sort((a, b) => (a > b ? 1 : -1));

    const result: string[] = [];
    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    };

    for (const k of keys) {
        const parts = (_enum[k] as string)
            .split('_')
            .map((part) => capitalize(part));

        result.push(parts.join(' '));
    }

    return result;
};

export const createReplaceGrass = (target: EWallID): SwapLogic[] => [
    {
        name: `Replace grass ${EWallID[target]} below surface`,
        target: target + wallOffset,
        table: [
            [EWallID.FlowerUnsafe + wallOffset, 10],
            [EWallID.GrassUnsafe, 90],
        ],
        branches: [
            {
                payload: -EWorldYType.SURFACE - 1,
                type: EBranchType.BELOW_Y,
            },
        ],
    },
    {
        name: `Replace grass ${EWallID[target]} on surface`,
        target: target + wallOffset,
        table: [[EWallID.JungleUnsafe + wallOffset, 100]],
        branches: [
            {
                payload: -EWorldYType.SURFACE - 1,
                type: EBranchType.ABOVE_Y,
            },
        ],
    },
];

export const createReplaceWall = (
    target: EWallID,
    replace: EWallID,
): SwapLogic => ({
    name: `Replace wall ${EWallID[target]} => ${EWallID[replace]}`,
    target: target + wallOffset,
    table: [[replace + wallOffset, 100]],
});

export const createReplaceTile = (
    target: ETileID,
    replace: ETileID,
): SwapLogic => ({
    name: `Replace tile ${ETileID[target]} => ${ETileID[replace]}`,
    target,
    table: [[replace, 100]],
});

export const downloadWorld = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = `${name}.wld`;
    a.href = url;
    a.target = '_blank';
    a.style.zIndex = '-100';
    a.style.opacity = '0';
    a.style.position = 'fixed';
    a.style.pointerEvents = 'none';
    a.style.left = '-200%';

    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    a.remove();
};
