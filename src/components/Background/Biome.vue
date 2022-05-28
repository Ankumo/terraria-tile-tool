<template>
    <div :class="['biome', { night: state.nightMode && !underworld }]">
        <template v-for="(id, index) in indexes" :key="index">
            <Sprite
                v-if="id >= 0"
                :index="id"
                :style="{
                    zIndex: index - 2,
                    '--speed': `${(5 - index) * 25}s`,
                    animationDelay: delays[index] + 's',
                    '--filter': filter,
                }"
                :spriteInfo="getBgInfo(id)"
                class="biome-sprite"
                :paused="paused"
            />
        </template>
    </div>
</template>

<style scoped>
@keyframes flow {
    from {
        transform: translate3d(0, 0, 0) scale(var(--scale)) var(--flip);
    }

    to {
        transform: translate3d(calc(var(--w) * var(--scale) * -2px), 0, 0)
            scale(var(--scale)) var(--flip);
    }
}

.biome-sprite {
    --ratio: 2;
    --w: calc(1920 * var(--ratio));
    --offset: -200px;
    --filter: sepia(0);

    position: fixed;
    width: calc(var(--w) * 4px) !important;
    height: 100vh;
    bottom: calc(var(--offset) * var(--ratio));
    left: 0;
    animation: flow calc(var(--speed) * var(--scale)) infinite linear;
    image-rendering: pixelated;
    background-size: calc(var(--w) * 1px) auto;
    background-repeat: repeat-x;
    filter: var(--filter);
    transition: filter 2.5s;
    will-change: transform;
}

.biome-sprite.single {
    background-position-y: calc(
        var(--active) * -1px *
            (var(--height) * (var(--w) / var(--width)) + var(--pad))
    );
}

.biome-sprite:deep(div) {
    width: 100% !important;
    height: 200% !important;
    background-repeat: repeat-x;
    background-size: calc(var(--w) * 1px) auto;
    image-rendering: pixelated;
}

.biome.night .biome-sprite {
    filter: var(--filter);
}

@media (max-device-height: 1440px) {
    .biome-sprite {
        --ratio: calc(1 / 0.75);
    }
}

@media (max-device-height: 1080px) {
    .biome-sprite {
        --ratio: 1;
    }
}

@media (max-device-height: 900px) {
    .biome-sprite {
        --ratio: calc(1 / 1.2);
    }
}

@media (max-device-height: 768px) {
    .biome-sprite {
        --ratio: calc(1 / 1.4055);
    }
}
</style>

<script lang="ts">
import { bgInfo, biomeInfo } from '@/lib/constants';
import { EBiome } from '@/lib/enums';
import { BGState, BiomeInfo } from '@/lib/types';
import { defineComponent, PropType } from 'vue';
import Sprite from '../Sprite.vue';

export default defineComponent({
    components: { Sprite },
    props: {
        state: {
            type: Object as PropType<BGState>,
            required: true,
        },
    },
    data() {
        const delays: number[] = [];

        for (let i = 0; i < 5; i++) {
            delays.push(Math.random() * -5);
        }

        return {
            delays,
        };
    },
    methods: {
        getBgInfo(index: number) {
            return bgInfo[index];
        },
    },
    computed: {
        biomeInfo(): BiomeInfo {
            return biomeInfo[this.state.biome];
        },
        indexes(): number[] {
            return this.biomeInfo.sets[this.state.style];
        },
        paused(): boolean {
            return this.state.paused || !this.state.anim;
        },
        underworld(): boolean {
            return this.state.biome === EBiome.UNDERWORLD;
        },
        filter(): string | undefined {
            if (!this.biomeInfo.f) {
                return undefined;
            }

            return this.state.nightMode
                ? this.biomeInfo.f.n
                : this.biomeInfo.f.d;
        },
    },
});
</script>
