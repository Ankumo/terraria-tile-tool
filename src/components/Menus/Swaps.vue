<template>
    <div v-if="deletingSwap" class="msg">
        <Text>
            Are you sure you want to delete "{{ deletingSwap.name }}" swap?
        </Text>

        <div class="link-group">
            <Link @click.left="$emit('delete', deleting)"> Yes </Link>

            <Link @click.left="deleting = -1"> No </Link>
        </div>
    </div>
    <div v-else class="swaps">
        <div :class="['panel', { empty: swaps.length === 0 }]">
            <div v-for="(item, index) in swaps" :key="index" class="panel">
                <div class="icon">
                    <WallIcon v-if="item.icon < 0" :id="-item.icon - 1" />

                    <TileIcon v-else :id="item.icon" />
                </div>

                <Text class="title">
                    {{ item.name }}
                </Text>

                <div class="icon-btn-group">
                    <Text sm v-if="hoverText[index]">
                        {{ hoverText[index] }}
                    </Text>

                    <IconBtn
                        type="export"
                        @mouseenter="hoverText[index] = 'Export to clipboard'"
                        @mouseleave="hoverText[index] = ''"
                        @click.left="_export(index)"
                    />

                    <IconBtn
                        type="rename"
                        @mouseenter="hoverText[index] = 'Edit'"
                        @mouseleave="hoverText[index] = ''"
                        @click.left="$emit('edit', index)"
                    />

                    <IconBtn
                        type="delete"
                        @mouseenter="hoverText[index] = 'Delete'"
                        @mouseleave="hoverText[index] = ''"
                        @click.left="deleting = index"
                    />
                </div>
            </div>

            <Text v-if="swaps.length === 0"> No swaps created yet... </Text>
        </div>

        <div class="btn-group">
            <Button @click="$emit('close')"> Back </Button>

            <Button @click="$emit('edit', -1)"> New </Button>
        </div>
    </div>
</template>

<style scoped>
.swaps {
    width: 600px;
}

.empty {
    display: flex;
    align-items: center;
    justify-content: center;
}

.swaps > .panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.4rem 0.5rem;
    border-radius: 10px;
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
}

.panel > .panel {
    padding: 0.4rem 0.5rem;
    background: rgba(54, 72, 139, 0.65);
    border-color: rgba(79, 124, 193, 0.5);
    display: flex;
    align-items: center;
}

.icon-btn-group {
    display: inline-flex;
    margin-left: auto;
    align-items: center;
    gap: 0.5rem;
}

.title {
    margin-left: 0.5rem;
}

.icon {
    border: 2px solid rgba(79, 124, 193, 0.5);
    border-radius: 8px;
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.icon .tile-icon,
.icon .wall-icon {
    transform: scale(2.35);
}

.icon-btn-group .text {
    margin-right: 0.5rem;
}

.title {
    --size: 1.75rem;
}

.link-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
    margin-top: 1rem;
}

.msg {
    margin-top: 1rem;
}

@media (max-width: 1600px) {
    .swaps > .panel {
        height: 450px;
    }
}

@media (max-width: 1366px) {
    .swaps > .panel {
        height: 375px;
    }
}
</style>

<script lang="ts">
import { SwapMission } from '@/lib/types';
import { defineComponent, PropType } from 'vue';
import Button from '../Controls/Button.vue';
import Text from '../Controls/Text.vue';
import Link from '../Controls/Link.vue';
import TileIcon from '../Controls/TileIcon.vue';
import WallIcon from '../Controls/WallIcon.vue';
import IconBtn from '../Controls/IconBtn.vue';

export default defineComponent({
    components: { Button, Text, Link, TileIcon, WallIcon, IconBtn },
    props: {
        swaps: {
            type: Array as PropType<SwapMission[]>,
            required: true,
        },
    },
    data() {
        return {
            deleting: -1,
            hoverText: {} as Record<number, string>,
        };
    },
    computed: {
        deletingSwap(): SwapMission | null {
            if (this.deleting < 0 || this.deleting >= this.swaps.length) {
                return null;
            }

            return this.swaps[this.deleting];
        },
    },
    methods: {
        async _export(index: number) {
            if (!this.swaps[index]) {
                return;
            }

            const settings = JSON.stringify(this.swaps[index]);
            await navigator.clipboard.writeText(window.btoa(settings));

            this.hoverText[index] = 'Copied to clipboard';
        },
    },
    emits: ['delete', 'close', 'edit'],
});
</script>
