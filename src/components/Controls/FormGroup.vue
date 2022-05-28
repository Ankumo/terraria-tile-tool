<template>
    <div class="form-group">
        <Text sm> {{ text }}: </Text>

        <div v-if="group" class="form-group-group">
            <slot />
        </div>

        <slot v-else />
    </div>
</template>

<style scoped>
.form-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.form-group-group {
    display: inline-flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Text from './Text.vue';

export default defineComponent({
    components: { Text },
    props: {
        text: {
            type: String,
            required: true,
        },
        group: Boolean,
    },
});
</script>
