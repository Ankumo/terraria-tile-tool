<template>
    <div class="logo">
        <img
            draggable="false"
            src="@/assets/logo.png"
            class="pure"
            width="532"
            height="229"
        />
        <img
            draggable="false"
            src="@/assets/logo_c.png"
            class="corr"
            width="532"
            height="229"
        />
    </div>
</template>

<style scoped>
@keyframes logoRotate {
    0% {
        transform: rotate(5deg) translate3d(0, 0, 0);
    }

    25% {
        transform: rotate(0deg) translate3d(0, 0, 0);
    }

    50% {
        transform: rotate(-5deg) translate3d(0, 0, 0);
    }

    75% {
        transform: rotate(0deg) translate3d(0, 0, 0);
    }

    100% {
        transform: rotate(5deg) translate3d(0, 0, 0);
    }
}

@keyframes logoScale {
    0% {
        transform: scale(1.15);
    }

    25% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.85);
    }

    75% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.15);
    }
}

.logo {
    width: 450px;
    height: auto;
    position: fixed;
    animation: logoRotate 30s infinite linear;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 0;
    will-change: transform;
    user-select: none;
}

.logo img {
    width: 100%;
    height: auto;
    transform-origin: center center;
    will-change: transform;
    animation: logoScale 20s infinite linear;
}

.pure {
    position: relative;
    transition: opacity 2.5s;
}

.corr {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 7s;
}

.logo.night .corr {
    opacity: 1;
    transition: opacity 2.5s;
}

.logo.night .pure {
    opacity: 0;
    transition: opacity 7s;
}

.logo.paused,
.logo.paused img {
    animation: none !important;
}

@media (max-width: 1600px) {
    .logo {
        width: 380px;
    }
}

@media (max-width: 1366px) {
    .logo {
        width: 300px;
    }
}
</style>
