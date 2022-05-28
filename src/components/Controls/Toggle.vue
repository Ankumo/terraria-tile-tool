<template>
    <Link
        class="toggle link"
        @click.left="updateValue()"
        @contextmenu.prevent="updateValue(true)"
    >
        {{ title }}: {{ options[value] }}
    </Link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Link from './Link.vue';

export default defineComponent({
    props: {
        modelValue: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        options: {
            type: Array as PropType<string[]>,
            required: true,
        },
    },
    computed: {
        value: {
            get(): number {
                return this.modelValue;
            },
            set(value: number) {
                this.$emit('beforeUpdate', value, this.modelValue);
                this.$emit('update:modelValue', value);
            },
        },
    },
    emits: ['update:modelValue', 'beforeUpdate'],
    methods: {
        updateValue(reverse = false) {
            let val = this.value + (reverse ? -1 : 1);
            if (val < 0) {
                val = this.options.length - 1;
            } else if (val >= this.options.length) {
                val = 0;
            }
            this.value = val;
        },
    },
    components: { Link },
});
</script>
