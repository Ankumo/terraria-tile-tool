<template>
    <div class="wall-icon" :style="`--x:${pos.x};--y:${pos.y};`" />
</template>

<style scoped>
.wall-icon {
    width: 16px;
    height: 16px;
    background-image: url(../../assets/Sprites/walls.png);
    background-position: calc(var(--x) * -16px) calc(var(--y) * -16px);
    background-repeat: no-repeat;
    background-size: 1200%;
}
</style>

<script lang="ts">
import { EWallID } from '@/lib/enums';
import { defineComponent, PropType } from 'vue';

const rowWalls = 12;

export default defineComponent({
    props: {
        id: {
            type: Number as PropType<EWallID>,
            required: true,
        },
    },
    computed: {
        pos(): { x: number; y: number } {
            const y = Math.trunc(this.id / rowWalls);
            const x = this.id - y * rowWalls;

            return { x, y };
        },
    },
});
</script>
