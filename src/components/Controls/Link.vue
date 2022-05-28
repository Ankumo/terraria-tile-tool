<template>
    <Text class="link" v-bind="$attrs">
        <slot />
    </Text>
</template>

<style scoped>
.link {
    color: rgba(145, 145, 161, 0.85);
    cursor: pointer !important;
}

.link:hover {
    color: rgb(255, 231, 69);
    transform: scale(1.15);
}

.link:deep(.outline) {
    -webkit-text-stroke: 4px rgba(0, 0, 0, 0.75);
    text-stroke: 4px rgba(0, 0, 0, 0.75);
}

.link:hover:deep(.outline) {
    -webkit-text-stroke: 4px black;
    text-stroke: 4px black;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Text from './Text.vue';

export default defineComponent({
    components: { Text },
});
</script>
