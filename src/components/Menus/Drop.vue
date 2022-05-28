<template>
    <div
        :class="['drop-menu panel', { hover }]"
        @drop="dropped"
        @dragenter="hover = true"
        @dragleave="dragLeave"
    >
        <Text> Drop here </Text>
    </div>
</template>

<style scoped>
.drop-menu {
    width: 500px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.drop-menu.hover {
    border-color: rgb(255, 231, 69);
}

@media (max-width: 1600px) {
    .drop-menu {
        height: 450px;
    }
}

@media (max-width: 1366px) {
    .drop-menu {
        height: 375px;
    }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Text from '../Controls/Text.vue';

export default defineComponent({
    components: { Text },
    data() {
        return {
            hover: false,
        };
    },
    methods: {
        wDragEnter() {
            this.$emit('open');
        },
        wDragLeave(e: DragEvent) {
            if ((e as any).fromElement === null) {
                this.$emit('close');
            }
        },
        wDragOver(e: DragEvent) {
            e.preventDefault();
        },
        wDrop(e: DragEvent) {
            e.preventDefault();
            this.$emit('close');
        },
        dragLeave(e: DragEvent) {
            if (!this.$el.contains((e as any).fromElement)) {
                this.hover = false;
            }
        },
        dropped(e: DragEvent) {
            e.preventDefault();
            e.stopImmediatePropagation();
            this.$emit('close');

            if (e.dataTransfer && e.dataTransfer.files.length) {
                this.$emit('data', e.dataTransfer.files);
            }
        },
    },
    emits: ['open', 'close', 'data'],
    mounted() {
        window.addEventListener('dragenter', this.wDragEnter);
        window.addEventListener('dragleave', this.wDragLeave);
        window.addEventListener('drop', this.wDrop);
        window.addEventListener('dragover', this.wDragOver);
    },
    unmounted() {
        window.removeEventListener('dragenter', this.wDragEnter);
        window.removeEventListener('dragleave', this.wDragLeave);
        window.removeEventListener('drop', this.wDrop);
        window.removeEventListener('dragover', this.wDragOver);
    },
});
</script>
