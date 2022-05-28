<template>
    <div :class="['progress', { crimson }]">
        <div class="outer" />
        <div class="dirt-wrapper">
            <div
                class="dirt"
                :style="{
                    width: `${prec}%`,
                }"
            />
        </div>
    </div>
</template>

<style scoped>
.progress {
    width: 100%;
    position: relative;
    z-index: 1;
    height: 70px;
}

.outer {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(../../../assets/Sprites/Outer_Corrupt.png);
}

.progress.crimson .outer {
    background-image: url(../../../assets/Sprites/Outer_Crimson.png);
}

.dirt-wrapper {
    width: 92%;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    height: 100%;
}

.dirt {
    position: absolute;
    height: 16px;
    z-index: 1;
    left: 0;
    bottom: 18px;
    background-size: auto 16px;
    background-repeat: repeat-x;
    background-image: url(../../../assets/Sprites/Outer_Dirt.png);
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        crimson: {
            type: Boolean,
            required: true,
        },
        prec: {
            type: Number,
            required: true,
        },
    },
});
</script>
