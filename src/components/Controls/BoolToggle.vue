<template>
    <Toggle :options="options" v-model="value" :title="title" />
</template>

<script lang="ts">
import Toggle from './Toggle.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    components: { Toggle },
    props: {
        options: {
            type: Array as PropType<string[]>,
            default: () => ['Disabled', 'Enabled'],
        },
        modelValue: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    emits: ['update:modelValue', 'beforeUpdate'],
    computed: {
        value: {
            get(): number {
                return this.modelValue ? 1 : 0;
            },
            set(val: number) {
                this.$emit('beforeUpdate', !!val, !!this.value);
                this.$emit('update:modelValue', !!val);
            },
        },
    },
});
</script>
