<template>
    <div class="bg">
        <ColorBg
            :class="{ night: state.nightMode, underworld }"
            :style="{
                '--filter': skyFilter,
            }"
        />

        <template v-if="!underworld">
            <transition name="fade">
                <Clouds
                    :class="{ night: state.nightMode }"
                    :key="biomeChangeKey"
                    :paused="paused"
                    :style="{
                        '--filter': cloudsFilter,
                    }"
                />
            </transition>

            <SunMoon
                :night="state.nightMode"
                :type="state.nightMode ? state.moon.style : state.sun"
                :phase="state.nightMode ? state.moon.phase : 0"
            />

            <transition name="fade" :duration="2500">
                <Stars v-if="state.nightMode" :class="{ paused }" />
            </transition>
        </template>

        <transition name="fade">
            <Biome :key="biomeChangeKey" :state="state" />
        </transition>
    </div>
</template>

<style scoped>
.bg {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Clouds from './Clouds.vue';
import { BGState, BiomeInfo } from '@/lib/types';
import Biome from './Biome.vue';
import ColorBg from './ColorBg.vue';
import { EBiome } from '@/lib/enums';
import { biomeInfo } from '@/lib/constants';
import SunMoon from './SunMoon.vue';
import Stars from './Stars.vue';

export default defineComponent({
    components: { Clouds, Biome, ColorBg, SunMoon, Stars },
    props: {
        state: {
            type: Object as PropType<BGState>,
            required: true,
        },
    },
    computed: {
        biomeInfo(): BiomeInfo {
            return biomeInfo[this.state.biome];
        },
        underworld(): boolean {
            return this.state.biome === EBiome.UNDERWORLD;
        },
        skyFilter(): string | undefined {
            if (!this.biomeInfo.skyF) {
                return undefined;
            }

            return this.state.nightMode
                ? this.biomeInfo.skyF.n
                : this.biomeInfo.skyF.d;
        },
        cloudsFilter(): string | undefined {
            if (!this.biomeInfo.cloudsF) {
                return undefined;
            }

            return this.state.nightMode
                ? this.biomeInfo.cloudsF.n
                : this.biomeInfo.cloudsF.d;
        },
        biomeChangeKey(): string {
            return `${this.state.biome}_${this.state.style}`;
        },
        paused(): boolean {
            return this.state.paused || !this.state.anim;
        },
    },
});
</script>
