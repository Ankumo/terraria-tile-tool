<template v-if="loaded">
    <div
        v-if="sprite.single"
        :class="['sprite', 'single', { paused }]"
        :style="{
            backgroundImage: `url(${getSrc(index)})`,
            //@ts-ignore: strange ts error here... probably a @types bug
            '--active': active,
            ...spriteStyle,
            ...cssVars,
        }"
    />
    <div v-else :class="['sprite', { paused }]" :style="cssVars">
        <div
            v-for="i in sprite.count"
            :key="i"
            :style="{
                backgroundImage: `url(${getSrc(
                    i === 1 ? index + i - 1 : index + sprite.pad + i - 1,
                )})`,
                opacity: active === i - 1 ? 1 : undefined,
                ...spriteStyle,
            }"
        />
    </div>
</template>

<style scoped>
.sprite {
    --flip: scaleX(1);
    --transform: scaleX(1);

    width: 100%;
    transform: scale(var(--scale)) var(--flip) var(--transform);
}

.sprite.single {
    background-position-y: calc(
        var(--active) * (var(--height) + var(--pad)) * 1px
    );
}

.sprite:not(.single) > div {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
}

.sprite > div {
    height: 100%;
}
</style>

<script lang="ts">
import { SpriteInfo } from '@/lib/types';
import { CSSProperties, defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        index: {
            type: Number,
            required: true,
        },
        spriteInfo: {
            type: Object as PropType<SpriteInfo>,
            default: () => ({}),
        },
        selected: {
            type: Number,
            default: -1,
        },
        spriteStyle: {
            type: Object as PropType<CSSProperties & Record<string, any>>,
            default: () => ({}),
        },
        paused: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            interval: undefined as number | undefined,
            loaded: false,
            h: 0,
            w: 0,
            active: 0,
        };
    },
    computed: {
        ch(): number {
            return this.sprite.single
                ? (this.h - (this.sprite.count - 1) * this.sprite.pad) /
                      this.sprite.count
                : this.h;
        },
        sprite(): Required<SpriteInfo> {
            const result: SpriteInfo = {
                count: this.spriteInfo.single === undefined ? 1 : 2,
                delay: 200,
                pad: 0,
                src: 'Backgrounds/Background_{?}.png',
            };

            Object.assign(result, this.spriteInfo);

            return result as any;
        },
        cssVars(): CSSProperties & Record<string, any> {
            return {
                '--offset':
                    this.sprite.offset !== undefined
                        ? `${this.sprite.offset}px`
                        : undefined,
                '--scale': this.sprite.scale || 1,
                '--height': `${this.ch}`,
                '--width': `${this.w}`,
                '--flip': this.sprite.flip ? 'scaleX(-1)' : undefined,
                '--pad': `${this.sprite.pad}`,
            };
        },
    },
    methods: {
        getSrc(index: number) {
            return require(`@/assets/Sprites/${this.sprite.src.replace(
                '{?}',
                index + '',
            )}`);
        },
        activeInterval() {
            this.interval = setInterval(() => {
                if (this.active + 1 >= this.sprite.count) {
                    this.active = 0;
                } else {
                    this.active++;
                }
            }, this.sprite.delay);
        },
    },
    created() {
        const img = new Image();
        img.src = this.getSrc(this.index);

        const check = () => {
            if (img.naturalHeight && img.naturalWidth) {
                clearInterval(loadInterval);

                this.w = img.naturalWidth;
                this.h = img.naturalHeight;
                img.remove();

                return true;
            }

            return false;
        };

        const loadInterval = setInterval(check, 150);

        img.onload = img.onerror = () => {
            if (!check()) {
                clearInterval(loadInterval);
            }
        };
    },
    mounted() {
        if (this.sprite.count === 1) {
            return;
        }

        if (this.selected >= 0) {
            this.active = this.selected;
        } else if (!this.paused) {
            this.activeInterval();
        }
    },
    unmounted() {
        clearInterval(this.interval);
    },
    watch: {
        paused(n) {
            if (n) {
                clearInterval(this.interval);
            } else {
                this.activeInterval();
            }
        },
    },
});
</script>
