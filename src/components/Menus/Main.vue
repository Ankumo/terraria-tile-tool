<template>
    <div class="main-menu">
        <div class="drag panel">
            <Text> Drag and drop world file here, or </Text>
            <Link @click.left="selectFile">select manually</Link>
        </div>
        <Button @click="openSwapsMenu">Manage swaps</Button>
    </div>
</template>

<style scoped>
.main-menu {
    width: 500px;
    height: 100%;
}

.btn {
    width: 100%;
    margin-top: 1rem;
}

.drag {
    display: flex;
    height: 500px;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    font-size: 1.5rem;
    color: white;
    padding: 1rem;
}

.drag .link,
.drag:deep(.link) .outline {
    font-size: 2rem;
}

.drag .text {
    cursor: default;
}

.drag .link {
    margin-top: 0.75rem;
}

@media (max-width: 1600px) {
    .drag {
        height: 450px;
    }
}

@media (max-width: 1366px) {
    .drag {
        height: 375px;
    }
}
</style>

<script lang="ts">
import { EActiveMenu } from '@/lib/enums';
import { defineComponent } from 'vue';
import Button from '../Controls/Button.vue';
import Link from '../Controls/Link.vue';
import Text from '../Controls/Text.vue';

export default defineComponent({
    components: { Button, Link, Text },
    emits: ['openMenu', 'data'],
    methods: {
        openSwapsMenu() {
            this.$emit('openMenu', EActiveMenu.SWAPS);
        },
        selectFile() {
            const transfer = document.createElement('input');
            transfer.type = 'file';
            transfer.accept = '.wld';
            transfer.multiple = false;
            transfer.addEventListener('change', () => {
                if (transfer.files && transfer.files.length > 0) {
                    this.$emit('data', transfer.files);
                }
            });

            transfer.click();
        },
    },
});
</script>
