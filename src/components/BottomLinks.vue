<template>
    <div class="bottom-links">
        <a href="https://ankumo.ru/" title="My homepage" target="_blank">
            <img src="@/assets/paw.png" />
        </a>

        <a
            href="https://github.com/Ankumo/terraria-tile-tool"
            title="GitHub"
            target="_blank"
        >
            <img src="@/assets/github.png" />
        </a>
    </div>
</template>

<style scoped>
.bottom-links {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: fixed;
    bottom: 1rem;
    left: 1rem;
}

.bottom-links a img {
    width: 24px;
    height: 24px;
}
</style>
