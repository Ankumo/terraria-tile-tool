<template>
    <div :class="['clouds', { paused }]">
        <Cloud v-for="i in maxClouds" :key="i" ref="clouds" />
    </div>
</template>

<style scoped>
.clouds {
    --filter: sepia(0);

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    transition: filter 2.5s;
    filter: var(--filter);
}

.clouds.night {
    filter: brightness(30%) contrast(111%) var(--filter);
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Cloud from './Cloud.vue';

export default defineComponent({
    components: { Cloud },
    props: {
        paused: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            interval: undefined as number | undefined,
            maxClouds: 30,
        };
    },
    methods: {
        withCloud(action: (cloud: typeof Cloud) => boolean) {
            const clouds = this.$refs.clouds as Array<typeof Cloud>;

            clouds.some(action);
        },
        animateClouds() {
            this.interval = setInterval(() => {
                this.withCloud((c) => {
                    if (!c.active) {
                        c.active = Math.random() < 0.1;
                        return c.active;
                    }

                    return false;
                });
            }, 1200);
        },
    },
    mounted() {
        this.withCloud((c) => {
            c.active = Math.random() < 0.2;
            return false;
        });

        if (!this.paused) {
            this.animateClouds();
        }
    },
    unmounted() {
        clearInterval(this.interval);
    },
    watch: {
        paused(n) {
            if (n) {
                clearInterval(this.interval);
            } else {
                this.animateClouds();
            }
        },
    },
});
</script>
