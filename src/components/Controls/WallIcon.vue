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
    background-size: 400%;
}
</style>

<script lang="ts">
import { EWallID } from '@/lib/enums';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        id: {
            type: Number as PropType<EWallID>,
            required: true,
        },
    },
    computed: {
        pos(): { x: number; y: number } {
            const y = Math.trunc(this.id / 4);
            const x = this.id - y * 4;

            return { x, y };
        },
    },
});
</script>
