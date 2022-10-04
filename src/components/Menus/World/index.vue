<template>
    <div class="world">
        <div v-if="errMsg" class="msg">
            <Text>
                {{ errMsg }}
            </Text>

            <Link @click.left="$emit('close')">OK</Link>
        </div>

        <div v-else-if="done" class="msg">
            <Text>
                Applying successfully done! Save your new world file and place
                it in your Terraria worlds directory.
            </Text>

            <Link @click.left="save">Save</Link>

            <Link @click.left="saveBackup">Download backup file</Link>

            <Link @click.left="$emit('close')">Close</Link>
        </div>

        <template v-else>
            <div :class="['panel', { loading }]">
                <Text v-if="loading"> Loading... </Text>

                <template v-else>
                    <div class="panel info-group">
                        <div
                            class="corr"
                            :style="{ backgroundImage: `url(${getCorrSrc()})` }"
                        />

                        <div class="info">
                            <Text sm class="name">
                                {{ worldFile.worldName }}
                            </Text>

                            <table class="data" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <Text sm :style="{ color: diff.color }">
                                            {{ diff.title }}
                                        </Text>
                                    </td>

                                    <td>
                                        <Text sm>
                                            {{ size }}
                                        </Text>
                                    </td>

                                    <td>
                                        <Text sm>
                                            Created:
                                            {{ worldFile.creationDate }}
                                        </Text>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <template v-if="processing < 0">
                        <div class="swaps">
                            <div class="block">
                                <Text sm class="title"> Defaults </Text>

                                <div class="swaps-list">
                                    <SwapToggle
                                        v-for="(s, index) in defaultSwaps"
                                        :key="index"
                                        :swap="s"
                                        :selected="selected.includes(s)"
                                        @toggle="toggleSwap(s)"
                                    />
                                </div>
                            </div>

                            <div v-if="swaps.length > 0" class="block">
                                <Text sm class="title"> Custom </Text>

                                <div class="swaps-list">
                                    <SwapToggle
                                        v-for="(s, index) in swaps"
                                        :key="index"
                                        :swap="s"
                                        :selected="selected.includes(s)"
                                        @toggle="toggleSwap(s)"
                                    />
                                </div>
                            </div>
                        </div>
                    </template>
                    <div v-else class="progress-bar">
                        <Text sm> Applying: {{ processing }} % </Text>

                        <Progress
                            :crimson="worldFile.isCrimson"
                            :prec="processing"
                        />

                        <Text v-if="showWarn" sm class="warn">
                            Warning! Background animations will be paused during
                            the applying process for better CPU usage
                        </Text>
                    </div>
                </template>
            </div>
            <div class="btn-group">
                <Button @click="$emit('close')" :disabled="processing >= 0">
                    Back
                </Button>

                <Button
                    @click="apply"
                    :disabled="processing >= 0 || selected.length === 0"
                >
                    Apply
                </Button>
            </div>
        </template>
    </div>
</template>

<style scoped>
.world > .panel:not(.btn) {
    padding: 0.4rem 0.5rem;
    width: 600px;
    height: 500px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
}

.loading {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
}

.loading > .text {
    --size: 2rem;
}

.info-group {
    border-color: rgba(79, 124, 193, 0.5);
    padding: 0.4rem 0.5rem;
    display: flex;
    border-radius: 10px;
    gap: 0.4rem;
    background: rgba(54, 72, 139, 0.65);
}

.corr {
    width: 65px;
    height: 65px;
    border: 2px solid rgba(79, 124, 193, 0.5);
    border-radius: 12px;
    background-size: 106%;
    background-position: center center;
    flex: 0 0 65px;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.15rem 0;
    flex: auto;
}

.name::after {
    content: '';
    display: block;
    height: 2px;
    width: calc(100% + 0.9rem);
    background: rgba(79, 124, 193, 0.5);
    border-bottom: 2px solid rgba(33, 47, 85, 0.65);
    transform: translateX(-0.4rem);
}

.data {
    width: 100%;
    text-align: center;
}

.data .text {
    background: rgba(33, 47, 85, 0.65);
}

.data .text,
.data .text:deep(.outline) {
    padding: 0.25rem;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
}

.data tr * + * .text {
    margin-left: 0.4rem;
    width: calc(100% - 0.4rem);
}

.progress-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
}

.swaps .block .title {
    width: 100%;
    text-align: center;
    margin: 1rem 0;
}

.swaps .block .title:deep(.outline) {
    text-align: center;
    width: 100%;
}

.swaps .block .title::after {
    position: absolute;
    content: '';
    bottom: -0.3rem;
    height: 2px;
    width: calc(100% + 1rem);
    transform: translateX(-0.5rem);
    display: block;
    background: rgba(13, 13, 14, 0.95);
}

.swaps-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
}

.warn {
    text-align: center;
    color: rgb(255, 231, 69);
}

@media (max-width: 1600px) {
    .world > .panel:not(.btn) {
        height: 450px;
    }
}

@media (max-width: 1366px) {
    .world > .panel:not(.btn) {
        height: 375px;
    }
}
</style>

<script lang="ts">
import { EWorldDifficulty } from '@/lib/enums';
import { WorldFile } from '@/lib/worldFile';
import { defineComponent, PropType } from 'vue';
import Link from '../../Controls/Link.vue';
import Text from '../../Controls/Text.vue';
import Button from '../../Controls/Button.vue';
import {
    SwapMission,
    WorldFileWorkerOutMessage,
    WorldFileWorkerInMessage,
} from '@/lib/types';
import Worker from 'worker-loader!@/lib/worldFile.worker.ts';
import Progress from './Progress.vue';
import SwapToggle from './SwapToggle.vue';
import { defaultSwaps } from '@/lib/constants';
import { BinaryReader } from '@/lib/binaryReader';
import { downloadWorld } from '@/lib/utils';

const difficulty: Record<EWorldDifficulty, string[]> = {
    [EWorldDifficulty.EXPERT]: ['Expert', '#f19d19'],
    [EWorldDifficulty.NORMAL]: ['Normal', 'white'],
    [EWorldDifficulty.JOURNEY]: ['Journey', '#ed82ba'],
    [EWorldDifficulty.MASTER]: ['Master', '#cd342f'],
};

export default defineComponent({
    components: { Link, Text, Button, Progress, SwapToggle },
    props: {
        file: {
            type: Object as PropType<File | null>,
            required: true,
        },
        swaps: {
            type: Array as PropType<SwapMission[]>,
            required: true,
        },
        showWarn: Boolean,
    },
    data() {
        return {
            errMsg: '',
            loading: true,
            worldFile: new WorldFile(this.file!),
            worker: new Worker(),
            processing: -1,
            defaultSwaps,
            selected: [] as SwapMission[],
            done: false,
        };
    },
    methods: {
        getCorrSrc() {
            return require(`@/assets/Sprites/Corr_${this.worldFile.worldCorr}.png`);
        },
        toggleSwap(swap: SwapMission) {
            const index = this.selected.indexOf(swap);

            if (~index) {
                this.selected.splice(index, 1);
            } else {
                this.selected.push(swap);
            }
        },
        save() {
            this.worker.postMessage({
                type: 'save',
            });
        },
        saveBackup() {
            this.worker.postMessage({
                type: 'saveBackup',
            });
        },
        async apply() {
            this.$emit('pauseBg');

            this.worker.postMessage({
                type: 'process',
                payload: JSON.parse(JSON.stringify(this.selected)),
            } as WorldFileWorkerInMessage);

            this.processing = 0;
        },
    },
    computed: {
        diff(): { title: string; color: string } {
            const [title, color] = difficulty[this.worldFile.worldDifficulty];

            return { color, title };
        },
        size(): string {
            switch (this.worldFile.capX) {
                default:
                    return 'Unknown size';
                case 4200:
                    return 'Small World';
                case 6400:
                    return 'Medium World';
                case 8400:
                    return 'Large World';
            }
        },
    },
    emits: ['close', 'pauseBg', 'done'],
    async created() {
        if (this.file === null) {
            this.errMsg =
                "World file with .wld extension wasn't found in your selected files. Please try again";
        } else {
            const timeout = setTimeout(() => {
                this.errMsg = 'Unable to read world file: Timeout';
                this.loading = false;
            }, 10000);

            this.worker.onmessage = (
                e: MessageEvent<WorldFileWorkerOutMessage>,
            ) => {
                switch (e.data.type) {
                    case 'done':
                        this.$emit('done');
                        this.processing = -1;
                        this.done = true;
                        break;
                    case 'progress':
                        this.processing = e.data.payload;
                        break;
                    case 'error':
                        this.$emit('done');
                        this.processing = -1;
                        this.errMsg =
                            typeof e.data.payload === 'string'
                                ? e.data.payload
                                : e.data.payload?.message || 'unknown error';
                        break;
                    case 'loaded':
                        const result = e.data.payload;

                        if (result instanceof Error) {
                            this.errMsg = `Unable to read world file: ${
                                result.message || 'unknown error'
                            }`;
                        } else if (typeof result === 'string') {
                            this.errMsg = result;
                        } else {
                            this.worldFile = result;
                        }

                        this.loading = false;
                        clearTimeout(timeout);
                        break;
                    case 'save':
                    case 'saveBackup':
                        if (e.data.payload) {
                            const r = new BinaryReader(e.data.payload);

                            downloadWorld(
                                r.toBlob(),
                                this.worldFile.worldName +
                                    (e.data.type === 'save' ? '_ttt' : ''),
                            );
                        }
                        break;
                }
            };

            this.worker.postMessage({
                type: 'init',
                payload: this.file,
            });
        }
    },
    beforeUnmount() {
        this.worker.terminate();
    },
});
</script>
