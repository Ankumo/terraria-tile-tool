<template>
    <Logo
        :class="{
            paused: bgState.paused || !bgState.anim,
            night: bgState.nightMode,
        }"
    />

    <Background :state="bgState" />

    <div class="app-wrapper">
        <Main
            v-show="menu === EActiveMenu.MAIN"
            @openMenu="openMenu($event)"
            @data="processFiles"
        />

        <Drop
            v-show="menu === EActiveMenu.DROP"
            @open="openMenu(EActiveMenu.DROP)"
            @close="menu = oldMenu"
            @data="processFiles"
        />

        <World
            v-if="menu === EActiveMenu.WORLD"
            :file="worldFile"
            :swaps="swaps"
            :showWarn="bgState.anim"
            @close="menu = EActiveMenu.MAIN"
            @pauseBg="bgState.paused = true"
            @done="bgState.paused = false"
        />

        <Swaps
            v-if="menu === EActiveMenu.SWAPS"
            :swaps="swaps"
            @close="menu = EActiveMenu.MAIN"
            @edit="editSwap"
            @delete="deleteSwap"
        />

        <Swap
            v-if="menu === EActiveMenu.SWAP"
            :item="swaps[editingSwap]"
            @save="saveSwap"
            @close="menu = EActiveMenu.SWAPS"
        />

        <BgSettings
            v-if="menu === EActiveMenu.BG_SETTINGS"
            :settings="bgState"
            @close="menu = oldMenu"
        />

        <Link
            v-else-if="!bgState.paused"
            class="bg-settings"
            @click.left="openMenu(EActiveMenu.BG_SETTINGS)"
        >
            BG Settings
        </Link>

        <BottomLinks />
    </div>
</template>

<style>
* {
    font-family: 'Andy STD', sans-serif;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: bold;
}

html,
body {
    font-size: 18px;
    width: 100%;
    height: 100%;
    min-height: 90vh;
    overflow: hidden;
}

#app {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.app-wrapper {
    max-height: 74vh;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 25vh;
    width: 100%;
    display: flex;
    justify-content: center;
}

.bg-settings {
    position: fixed !important;
    bottom: 1rem;
    right: 2rem;
    --size: 2.5rem !important;
}

.paused,
.paused * {
    animation-play-state: paused !important;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.panel {
    background: rgba(54, 68, 116, 0.65);
    border: 2px solid rgba(13, 13, 14, 0.95);
    border-radius: 12px;
    box-sizing: border-box;
}

.btn-group {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.btn-group .btn {
    flex: 0 0 calc(50% - 0.5rem);
}

.msg {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}

.msg .link {
    margin-top: 1.5rem;
}

*::-webkit-scrollbar {
    width: 8px;
}

*::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 6px;
}

*::-webkit-scrollbar-track {
    margin: 1rem;
}

*::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 3px;
    border: 1px solid black;
}

*::-webkit-scrollbar-thumb:hover {
    border-color: rgb(255, 231, 69);
}

@media (max-width: 1366px) {
    .app-wrapper {
        margin-top: 23vh;
        max-height: 76vh;
    }
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Logo from './components/Logo.vue';
import Background from './components/Background/index.vue';
import { BGState, SwapMission } from './lib/types';
import {
    EActiveMenu,
    EBiome,
    EMoonPhase,
    EMoonStyle,
    ESunStyle,
} from './lib/enums';
import BgSettings from './components/Menus/BgSettings.vue';
import Main from './components/Menus/Main.vue';
import Link from './components/Controls/Link.vue';
import Drop from './components/Menus/Drop.vue';
import World from './components/Menus/World/index.vue';
import Swaps from './components/Menus/Swaps.vue';
import Swap from './components/Menus/Swap/index.vue';
import BottomLinks from './components/BottomLinks.vue';

export default defineComponent({
    components: {
        Logo,
        Background,
        BgSettings,
        Main,
        Link,
        Drop,
        World,
        Swaps,
        Swap,
        BottomLinks,
    },
    data() {
        return {
            bgState: {
                biome: EBiome.FOREST,
                moon: {
                    phase: EMoonPhase.FULL,
                    style: EMoonStyle.DEFAULT,
                },
                nightMode: window.matchMedia('(prefers-color-scheme: dark)')
                    .matches,
                paused: false,
                anim: true,
                style: 0,
                sun: ESunStyle.DEFAULT,
            } as BGState,
            menu: EActiveMenu.MAIN,
            oldMenu: EActiveMenu.MAIN,
            EActiveMenu,
            worldFile: null as File | null,
            swaps: [] as SwapMission[],
            editingSwap: -1,
        };
    },
    methods: {
        openMenu(menu: EActiveMenu) {
            if (this.menu !== EActiveMenu.DROP) {
                this.oldMenu = this.menu;
            }

            this.menu = menu;
        },
        processFiles(files: FileList) {
            this.worldFile = null;

            for (const f of files) {
                if (f.name.endsWith('.wld')) {
                    this.worldFile = f;
                    break;
                }
            }

            this.menu = EActiveMenu.WORLD;
        },
        editSwap(index: number) {
            if (index >= this.swaps.length) {
                return;
            }

            this.editingSwap = index;

            this.oldMenu = EActiveMenu.SWAPS;
            this.menu = EActiveMenu.SWAP;
        },
        saveSwap(item: SwapMission) {
            if (this.editingSwap < 0 || this.editingSwap >= this.swaps.length) {
                this.swaps.push(item);
            } else {
                this.swaps[this.editingSwap] = item;
            }

            window.localStorage.setItem('swaps', JSON.stringify(this.swaps));

            this.menu = EActiveMenu.SWAPS;
        },
        deleteSwap(index: number) {
            this.swaps.splice(index, 1);
            window.localStorage.setItem('swaps', JSON.stringify(this.swaps));
        },
    },
    created() {
        const bgSettingsRaw = window.localStorage.getItem('bgSettings');
        const swapsRaw = window.localStorage.getItem('swaps');

        let bgSettings: BGState = { ...this.bgState };

        if (bgSettingsRaw) {
            try {
                bgSettings = {
                    ...bgSettings,
                    ...JSON.parse(bgSettingsRaw),
                };
            } catch {
                //
            }
        }

        if (swapsRaw) {
            try {
                const swaps = JSON.parse(swapsRaw);

                if (Array.isArray(swaps)) {
                    this.swaps = swaps;
                }
            } catch {
                //
            }
        }

        this.bgState = bgSettings;
        window.localStorage.setItem('bgSettings', JSON.stringify(bgSettings));
    },
});
</script>
