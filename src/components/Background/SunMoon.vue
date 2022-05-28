<template>
    <div :class="['sm', { night }]">
        <transition name="fade" :duration="250">
            <template v-if="night">
                <Sprite
                    v-if="type !== EMoonStyle.SMILEY"
                    :key="`${phase}_${type}`"
                    :spriteInfo="{
                        single: true,
                        src: 'Moon_{?}.png',
                        count: 8,
                        scale: 1.1,
                    }"
                    :index="type"
                    :selected="phase"
                    class="moon"
                />
                <img
                    v-else
                    class="moon moon-smiley"
                    src="@/assets/Moon_Smiley.png"
                />
            </template>

            <template v-else>
                <img
                    :src="getSunSrc(type)"
                    :key="type"
                    :class="['sun', { default: type === ESunStyle.DEFAULT }]"
                />
            </template>
        </transition>
    </div>
</template>

<style scoped>
.sm {
    z-index: -2;
    position: fixed;
    top: 10%;
    left: 20%;
    transition: left 2.5s linear;
    --rotate: -8deg;
}

.sm.night {
    left: 80%;
    --rotate: 8deg;
}

.sm .sprite {
    width: calc(var(--width) * 1px);
    height: calc(var(--height) * 1px);
    --transform: rotate(var(--rotate));
}

.moon-smiley {
    transform: rotate(var(--rotate)) translate(-3px, -8px);
}

.fade-leave-active {
    position: absolute;
}

.sun {
    transform: scale(1.1) rotate(var(--rotate));
}

.sun.default {
    transform: translate(-25px, -25px) rotate(var(--rotate));
}
</style>

<script lang="ts">
import { EMoonStyle, ESunStyle } from '@/lib/enums';
import { defineComponent } from 'vue';
import Sprite from '../Sprite.vue';

export default defineComponent({
    components: {
        Sprite,
    },
    props: {
        night: {
            type: Boolean,
            required: true,
        },
        type: {
            type: Number,
            required: true,
        },
        phase: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            EMoonStyle,
            ESunStyle,
        };
    },
    methods: {
        getSunSrc(index: number) {
            return require(`@/assets/Sprites/Sun_${index}.png`);
        },
    },
});
</script>
