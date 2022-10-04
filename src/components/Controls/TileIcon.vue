<template>
    <div class="tile-icon" :style="`--x:${pos.x};--y:${pos.y};`" />
</template>

<style scoped>
.tile-icon {
    width: 16px;
    height: 16px;
    background-image: url(../../assets/Sprites/tiles.png);
    background-position: calc(var(--x) * -16px) calc(var(--y) * -16px);
    background-repeat: no-repeat;
}
</style>

<script lang="ts">
import { ETileID } from '@/lib/enums';
import { defineComponent, PropType } from 'vue';

const rowTiles = 21;

export default defineComponent({
    props: {
        id: {
            type: Number as PropType<ETileID>,
            required: true,
        },
    },
    computed: {
        pos(): { x: number; y: number } {
            const id = this.id < 0 ? 10 : this.id;

            const y = Math.trunc(id / rowTiles);
            const x = id - y * rowTiles;

            return { x, y };
        },
    },
});
</script>
