<template>
    <div
        v-show="active"
        :class="['cloud', { flip }]"
        :style="{
            top: `${top}px`,
            ...vars,
        }"
        @animationend="ended"
    >
        <img :src="src" />
    </div>
</template>

<style scoped>
@keyframes move {
    from {
        transform: var(--scale) translate3d(var(--start), 0, 0);
    }

    to {
        transform: var(--scale) translate3d(-300px, 0, 0);
    }
}

@keyframes appear {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.cloud {
    position: absolute;
    animation: move var(--speed) linear, appear var(--appear) linear;
    will-change: opacity, transform;
    left: 0;
    user-select: none;
}

.cloud.flip img {
    width: 100%;
    height: 100%;
    transform: scaleX(-1);
}

.clouds.paused .cloud {
    opacity: var(--scale);
    transform: var(--scale) translateX(var(--start));
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            active: false,
            type: 0,
            flip: false,
            scale: 1,
            start: 0,
            appear: 0,
            speed: 0,
            top: 0,
        };
    },
    computed: {
        src(): string {
            return require(`@/assets/Clouds/Cloud_${this.type}.png`);
        },
        vars(): Record<string, string> {
            return {
                '--start': `${this.start}px`,
                '--appear': `${this.appear}s`,
                '--speed': `${this.speed}s`,
                '--scale': `scale(${this.scale})`,
            };
        },
    },
    methods: {
        rnd(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        init() {
            this.flip = Math.random() < 0.5;
            this.type = Math.floor(Math.random() * 8);
            this.scale = this.rnd(70, 130) / 100;
            this.appear = this.rnd(15, 100) / 10;
            this.speed = this.rnd(180, 220) / 10;
            this.top = (this.rnd(0, 40) / 100) * window.screen.availHeight;
            this.start = this.rnd(200, window.screen.availWidth + 500);

            const speedM = this.start / window.screen.availWidth;
            this.speed *= speedM;

            if (this.scale > 1.2) {
                this.top += 100;
            }
        },
        ended(e: AnimationEvent) {
            if (e.animationName.startsWith('move')) {
                this.active = false;
            }
        },
    },
    watch: {
        active(n) {
            if (n) {
                this.init();
            }
        },
    },
});
</script>
