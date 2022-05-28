<template>
    <div class="swap">
        <div class="panel">
            <IconBtn
                type="export"
                @click.left="importFromClipboard"
                title="Import from Clipboard"
            />

            <div class="header panel">
                <Text>
                    {{ localValue.name }}
                </Text>
            </div>

            <div class="summary block">
                <Text sm class="title"> Summary </Text>

                <FormGroup text="Swap name" class="name">
                    <Input v-model="localValue.name" maxlength="20" />
                </FormGroup>

                <FormGroup text="Icon">
                    <IconSelect v-model="localValue.icon" />
                </FormGroup>
            </div>

            <Logic :mission="localValue" />
        </div>

        <div class="btn-group">
            <Button @click="$emit('close')"> Back </Button>
            <Button @click="$emit('save', localValue)"> Save </Button>
        </div>
    </div>
</template>

<style scoped>
.swap {
    width: 600px;
}

.swap > .panel {
    position: relative;
    padding: 1rem 0.5rem 0.4rem 0.5rem;
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
}

.swap > .panel > .icon-btn {
    position: absolute;
    right: 0.5rem;
    top: 0.4rem;
    z-index: 2;
}

.header {
    position: fixed;
    padding: 0.5rem;
    transform: translate(-50%, -110%);
    display: inline-block;
    background: rgb(81, 104, 168);
    left: 50%;
    z-index: 4;
}

.header .text {
    --size: 2.5rem;
}

.panel > .block + .block {
    margin-top: 1rem;
}

.block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
}

.block:deep(.title) {
    text-align: center;
    width: 100%;
    --size: 1.5rem;
}

.block:deep(.title)::after {
    display: block;
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: calc(100% + 1rem);
    transform: translateX(-0.5rem);
    height: 2px;
    background: rgba(13, 13, 14, 0.95);
    border-bottom: 2px solid rgba(79, 124, 193, 0.5);
    z-index: 0;
}

.block:deep(.title .outline) {
    text-align: center;
    width: 100%;
}

@media (max-width: 1600px) {
    .swap > .panel {
        height: 450px;
    }
}

@media (max-width: 1366px) {
    .swap > .panel {
        height: 375px;
    }
}
</style>

<script lang="ts">
import { SwapMission } from '@/lib/types';
import { defineComponent, PropType } from 'vue';
import Button from '../../Controls/Button.vue';
import Text from '../../Controls/Text.vue';
import Input from '../../Controls/Input.vue';
import IconSelect from '../../Controls/IconSelect.vue';
import IconBtn from '../../Controls/IconBtn.vue';
import FormGroup from '../../Controls/FormGroup.vue';
import Logic from './Logic.vue';

export default defineComponent({
    components: {
        Button,
        Text,
        Input,
        IconSelect,
        IconBtn,
        FormGroup,
        Logic,
    },
    props: {
        item: Object as PropType<SwapMission | null>,
    },
    data() {
        const localValue: SwapMission = this.item
            ? { ...this.item }
            : {
                  icon: 0,
                  logic: [],
                  name: 'New swap',
              };

        return {
            localValue,
        };
    },
    methods: {
        async importFromClipboard() {
            try {
                const clipboard = window.atob(
                    await navigator.clipboard.readText(),
                );

                const json = JSON.parse(clipboard);

                this.localValue = {
                    ...this.localValue,
                    ...json,
                };
            } catch {
                console.warn('Invalid data from clipboard');
            }
        },
    },
    emits: ['close', 'save'],
});
</script>
