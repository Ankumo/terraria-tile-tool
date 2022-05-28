<template>
    <div
        :class="['swap-toggle panel', { selected }]"
        @click.left="$emit('toggle')"
    >
        <WallIcon v-if="swap.icon >= wallOffset" :id="swap.icon - wallOffset" />

        <TileIcon v-else :id="swap.icon" />

        <Text sm>
            {{ swap.name }}
        </Text>
    </div>
</template>

<style scoped>
.swap-toggle {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem;
    gap: 0.4rem;
    cursor: pointer;
}

.swap-toggle.selected {
    border-color: rgb(255, 231, 69);
}
</style>

<script lang="ts">
import { SwapMission } from '@/lib/types';
import { defineComponent, PropType } from 'vue';
import Text from '@/components/Controls/Text.vue';
import WallIcon from '@/components/Controls/WallIcon.vue';
import { wallOffset } from '@/lib/constants';
import TileIcon from '@/components/Controls/TileIcon.vue';

export default defineComponent({
    components: { Text, WallIcon, TileIcon },
    props: {
        swap: {
            type: Object as PropType<SwapMission>,
            required: true,
        },
        selected: Boolean,
    },
    data() {
        return {
            wallOffset,
        };
    },
    emits: ['toggle'],
});
</script>
