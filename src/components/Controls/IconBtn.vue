<template>
    <img draggable="false" class="icon-btn" :src="getSrc()" />
</template>

<style scoped>
.icon-btn {
    cursor: pointer;
    opacity: 0.45;
}

.icon-btn:hover {
    opacity: 1;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IconBtns } from '@/lib/types';

export default defineComponent({
    props: {
        type: {
            type: String as PropType<IconBtns>,
            required: true,
        },
    },
    methods: {
        getSrc() {
            return require(`@/assets/IconBtn_${this.type}.png`);
        },
    },
});
</script>
