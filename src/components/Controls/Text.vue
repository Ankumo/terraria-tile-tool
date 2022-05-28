<template>
    <div :class="['text', { sm }]">
        <div class="outline">
            <slot />
        </div>

        <slot />
    </div>
</template>

<style scoped>
.text {
    --size: 2rem;
}

.text.sm {
    --size: 1.2rem;
}

.text,
.outline {
    color: white;
    line-height: 1;
    transition: transform 0.05s linear;
    transform-origin: center;
    font-size: var(--size);
    font-weight: 800;
    user-select: none;
    display: inline-block;
    position: relative;
    z-index: 1;
}

.outline {
    -webkit-text-stroke: 4px black;
    text-stroke: 4px black;
    color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.text.sm .outline {
    -webkit-text-stroke-width: 3.5px;
    text-stroke-width: 3.5px;
}

@media (max-width: 1600px) {
    .text {
        --size: 1.85rem !important;
    }

    .text.sm {
        --size: 1.2rem !important;
    }
}

@media (max-width: 1366px) {
    .text {
        --size: 1.6rem !important;
    }

    .text.sm {
        --size: 1.1rem !important;
    }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        sm: {
            type: Boolean,
        },
    },
});
</script>
