<template>
    <div class="color" />
</template>

<style scoped>
.color {
    --filter: sepia(0);
    position: fixed;
    left: 0;
    top: 0;
    z-index: -5;
    width: 100vw;
    height: 100vh;
    background-image: url(../../assets/Sprites/Backgrounds/Background_0.png);
    background-size: contain;
    transition: filter 2.5s;
    filter: var(--filter);
}

.color.underworld {
    background-image: url(../../assets/Sprites/Backgrounds/Background_1004.png);
}

.color.night:not(.underworld) {
    filter: brightness(11%) contrast(107%) var(--filter);
}
</style>
