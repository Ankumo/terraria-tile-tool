<template>
    <button
        :class="['btn panel', { sm, disabled }]"
        v-bind="$attrs"
        @click.left="onClick"
    >
        <Text>
            <slot />
        </Text>
    </button>
</template>

<style scoped>
.btn {
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;
    padding: 0.5rem 1.5rem;
    box-sizing: border-box;
    background: rgba(74, 96, 169, 0.65);
}

.btn .text {
    --size: 2.3rem;
}

.btn:hover:not(.disabled) {
    border-color: rgb(255, 231, 69);
}

.btn.sm {
    padding: 0.25rem 0.75rem;
    border-radius: 10px;
}

.btn.sm .text {
    --size: 1.2rem;
}

.btn.disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Text from './Text.vue';

export default defineComponent({
    components: {
        Text,
    },
    props: {
        sm: Boolean,
        disabled: Boolean,
    },
    methods: {
        onClick(e: MouseEvent) {
            if (this.disabled) {
                return;
            }

            this.$emit('click', e);
        },
    },
    emits: ['click'],
});
</script>
