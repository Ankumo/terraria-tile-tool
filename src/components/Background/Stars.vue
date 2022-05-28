<template>
    <div class="stars">
        <div
            v-for="(star, index) in stars"
            :key="index"
            class="star"
            :style="{
                left: `${star.x}%`,
                top: `${star.y}%`,
                animationDelay: `${star.delayScale}ms`,
                //@ts-ignore: why though :(
                '--max-scale': star.scale,
            }"
        >
            <img
                :src="srcs[star.type]"
                :style="{
                    animationDelay: `${star.delayRotate}s`,
                }"
            />
        </div>
    </div>
</template>

<style scoped>
@keyframes rotate {
    from {
        transform: rotate3d(0, 0, 1, 0deg);
    }

    to {
        transform: rotate3d(0, 0, 1, 360deg);
    }
}

@keyframes scale {
    0% {
        transform: scale3d(0.5, 0.5, 1);
    }

    50% {
        transform: scale3d(var(--max-scale), var(--max-scale), 1);
    }

    100% {
        transform: scale3d(0.5, 0.5, 1);
    }
}

.stars {
    position: fixed;
    z-index: -3;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}

.star {
    position: absolute;
    will-change: transform;
    animation: scale 1.5s infinite linear;
}

.stars img {
    will-change: transform;
    animation: rotate 20s infinite linear;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { Star } from '@/lib/types';
const starTypes = 5;

export default defineComponent({
    data() {
        const srcs: string[] = [];

        for (let i = 0; i < starTypes; i++) {
            srcs.push(require(`@/assets/Sprites/Star_${i}.png`));
        }

        const stars: Star[] = [];
        const count = Math.floor(Math.random() * 101) + 20;

        for (let i = 0; i < count; i++) {
            stars.push({
                scale: (Math.floor(Math.random() * 21) + 80) / 100,
                x: Math.random() * 100,
                y: Math.random() * 70,
                type: Math.floor(Math.random() * 5),
                delayScale: Math.floor(Math.random() * 1000),
                delayRotate: Math.floor(Math.random() * 20),
            });
        }

        return {
            srcs,
            stars,
        };
    },
});
</script>
