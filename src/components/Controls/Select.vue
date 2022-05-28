<template>
    <div class="dropdown panel">
        <div class="plaecholder">
            <slot :opt="selected || { key: null, text: ph }">
                <Text sm>
                    {{ ph }}
                </Text>
            </slot>
        </div>
        <ul>
            <li
                v-for="(opt, index) in options"
                :key="index"
                @click.left="select(opt)"
                :class="{ active: opt.key === value }"
            >
                <slot :opt="opt">
                    <Text sm>{{ opt.text }}</Text>
                </slot>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.dropdown {
    position: relative;
    padding: 0.4rem 0.5rem;
    display: inline-block;
}

.dropdown ul {
    list-style: none;
    position: absolute;
    max-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { DropdownOption } from '@/lib/types';
import Text from './Text.vue';

export default defineComponent({
    props: {
        options: {
            type: Array as PropType<DropdownOption[]>,
            required: true,
        },
        placeholder: String,
        modelValue: {
            type: [String, Number],
            required: true,
        },
    },
    data() {
        return {
            opened: false,
        };
    },
    methods: {
        select(opt: DropdownOption) {
            if (opt.key !== this.value) {
                this.value = opt.key;
            }
        },
    },
    computed: {
        ph(): string {
            if (this.selected) {
                return this.selected.text;
            }
            return this.placeholder || this.options[0].text;
        },
        value: {
            get(): string | number {
                return this.modelValue;
            },
            set(value: string | number) {
                this.$emit('update:modelValue', value);
            },
        },
        selected(): DropdownOption | null {
            const index = this.options.findIndex(
                (opt) => opt.key === this.value,
            );
            return this.options[index] || null;
        },
    },
    emits: ['update:modelValue'],
    components: { Text },
});
</script>
