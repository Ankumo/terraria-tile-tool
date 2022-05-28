<template>
    <div class="bg-settings-menu">
        <BoolToggle v-model="value.anim" title="Animations" />

        <Toggle
            v-model="value.biome"
            title="Biome"
            :options="biomes"
            @beforeUpdate="beforeUpdateBiome"
        />

        <Toggle
            v-model="value.style"
            :options="styles"
            title="Style"
            @beforeUpdate="beforeUpdateStyle"
        />

        <template v-if="!underworld">
            <BoolToggle v-model="value.nightMode" title="Night mode" />

            <template v-if="value.nightMode">
                <Toggle
                    v-model="value.moon.style"
                    :options="moonStyles"
                    title="Moon style"
                />

                <Toggle
                    v-if="value.moon.style !== EMoonStyle.SMILEY"
                    v-model="value.moon.phase"
                    :options="moonPhases"
                    title="Moon phase"
                />
            </template>

            <Toggle
                v-else
                v-model="value.sun"
                :options="sunStyles"
                title="Sun style"
            />
        </template>
        <Link @click.left="$emit('close')">Back</Link>
    </div>
</template>

<style scoped>
.bg-settings-menu {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bg-settings-menu .link {
    margin-top: 1rem;
    --size: 2.3rem;
}
</style>

<script lang="ts">
import { biomeInfo } from '@/lib/constants';
import { EBiome, EMoonPhase, EMoonStyle, ESunStyle } from '@/lib/enums';
import { BGState } from '@/lib/types';
import { defineComponent, PropType } from 'vue';
import Toggle from '../Controls/Toggle.vue';
import BoolToggle from '../Controls/BoolToggle.vue';
import Link from '../Controls/Link.vue';
import { fromEnum } from '@/lib/utils';

export default defineComponent({
    components: { Toggle, BoolToggle, Link },
    props: {
        settings: {
            type: Object as PropType<BGState>,
            required: true,
        },
    },
    data() {
        return {
            styleCache: {
                [this.settings.biome]: this.settings.style,
            } as { [key: number]: number },
            biomes: fromEnum(EBiome),
            moonPhases: fromEnum(EMoonPhase),
            sunStyles: fromEnum(ESunStyle),
            moonStyles: fromEnum(EMoonStyle),
            EMoonStyle,
        };
    },
    methods: {
        beforeUpdateBiome(n: EBiome) {
            const cache = this.styleCache[n];

            if (cache === undefined) {
                this.value.style = 0;
            } else {
                this.value.style = cache;
            }
        },
        beforeUpdateStyle(n: number) {
            this.styleCache[this.value.biome] = n;
        },
    },
    computed: {
        value(): BGState {
            return this.settings;
        },
        styles(): string[] {
            const result: string[] = [];

            for (let i = 0; i < biomeInfo[this.value.biome].sets.length; i++) {
                result.push(`Style ${i + 1}`);
            }

            return result;
        },
        underworld(): boolean {
            return this.settings.biome === EBiome.UNDERWORLD;
        },
    },
    watch: {
        value: {
            deep: true,
            handler(n: BGState) {
                window.localStorage.setItem('bgSettings', JSON.stringify(n));
            },
        },
    },
    emits: ['close'],
});
</script>
