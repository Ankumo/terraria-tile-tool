<template>
    <div
        :class="['icon-select', { updown, 'can-swap': wall < 0 }]"
        :title="placeholder"
    >
        <Input v-model="search">
            <Text sm class="placeholder">
                {{ placeholder }}
            </Text>
        </Input>

        <div class="selected" @click.left="toggleWalls">
            <WallIcon v-if="walls" :id="humanValue" />

            <TileIcon v-else :id="humanValue" />

            <Text sm>{{ humanValue }}</Text>
        </div>

        <ul class="panel">
            <li
                v-for="(opt, index) in filteredOptions"
                :key="index"
                @mousedown.left="
                    value = walls ? opt.index + wallOffset : opt.index
                "
                :class="{ active: opt.index === humanValue }"
                :title="opt.text"
            >
                <WallIcon v-if="walls" :id="opt.index" />

                <TileIcon v-else :id="opt.index" />

                <Text sm>{{ opt.text }}</Text>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.icon-select {
    position: relative;
    width: 200px;
    display: flex;
    align-items: center;
    z-index: 0;
    box-sizing: border-box;
    padding: 2px;
    gap: 0.4rem;
}

.icon-select:focus-within {
    z-index: 2;
}

.icon-select::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 2px solid rgba(13, 13, 14, 0.95);
    background: rgb(81, 104, 168);
    box-sizing: border-box;
}

.icon-select:focus-within::after {
    border-color: rgb(255, 231, 69);
}

.icon-select ul {
    list-style: none;
    position: absolute;
    top: calc(100% - 1rem);
    display: none;
    flex-direction: column;
    width: 100%;
    left: 0;
    padding-top: 0.5rem;
    z-index: -1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background: rgba(47, 64, 122, 0.9);
}

.icon-select:focus-within ul {
    display: flex;
}

.icon-select ul li {
    cursor: pointer;
    padding: 0.4rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}

.icon-select ul li .text,
.icon-select ul li .text:deep(.outline) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.icon-select ul li:first-child {
    margin-top: 0.5rem;
}

.icon-select ul .wall-icon,
.icon-select ul .tile-icon {
    flex: 0 0 auto;
}

.icon-select ul li.active .text {
    color: rgb(255, 231, 69);
}

.selected {
    display: inline-flex;
    align-items: center;
    margin-right: 0.5rem;
    z-index: 2;
    gap: 0.4rem;
}

.icon-select.can-swap .selected {
    cursor: pointer;
}

.icon-select .input {
    width: 100%;
    max-width: 100%;
    background: transparent;
    border: none;
    border-radius: 0;
    margin: 0;
    height: 100%;
}

.icon-select .input:deep(.outline) {
    padding: 0.4rem 0.5rem;
    margin: 0;
}

.placeholder {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    height: 100%;
    opacity: 0.5;
    pointer-events: none;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0.4rem 0.5rem;
}

.placeholder:deep(.outline) {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 !important;
}

.icon-select .input:focus-within .placeholder,
.icon-select .input > :deep(.content),
.icon-select .input > :deep(.outline) {
    opacity: 0;
}

.icon-select .input:focus-within:deep(.content),
.icon-select .input:focus-within:deep(.outline) {
    opacity: 1;
}
</style>

<script lang="ts">
import { ETileID, EWallID } from '@/lib/enums';
import { defineComponent } from 'vue';
import Input from './Input.vue';
import TileIcon from './TileIcon.vue';
import WallIcon from './WallIcon.vue';
import Text from './Text.vue';
import { wallOffset } from '@/lib/constants';

export default defineComponent({
    components: { Input, TileIcon, WallIcon, Text },
    props: {
        modelValue: {
            type: Number,
            required: true,
        },
        wall: {
            type: Number,
            default: -1,
        },
    },
    data() {
        return {
            search: '',
            updown: false,
            wallOffset,
        };
    },
    methods: {
        //TODO: Manage overflow
        /*focused(e: FocusEvent) {
            const rect: DOMRect = this.$el.getBoundingClientRect();
            const parentRect: DOMRect =
                this.$el.parentNode.getBoundingClientRect();

            //
        },*/
        toggleWalls() {
            if (this.wall >= 0) {
                return;
            }

            if (this.walls) {
                this.value -= wallOffset;
            } else if (this.value < 0) {
                this.value += wallOffset + 1;
            } else if (this.value >= EWallID.Count) {
                this.value = wallOffset + EWallID.Count - 1;
            } else {
                this.value += wallOffset;
            }
        },
        checkWallManualToggle(newWall: number) {
            if (newWall === 0 && this.walls) {
                this.value = 0;
            } else if (newWall === 1 && !this.walls) {
                this.value = wallOffset;
            }
        },
    },
    computed: {
        value: {
            get(): number {
                return this.modelValue;
            },
            set(value: number) {
                this.$emit('update:modelValue', value);
            },
        },
        walls(): boolean {
            return this.value >= wallOffset;
        },
        humanValue(): number {
            return this.walls ? this.value - wallOffset : this.value;
        },
        _enum(): typeof EWallID | typeof ETileID {
            return this.walls ? EWallID : ETileID;
        },
        options(): string[] {
            const options: string[] = [];
            const start = this.walls ? 0 : -1;

            for (let i = start; i < this._enum['Count']; i++) {
                options.push(`[${i}] ${this._enum[i]}`);
            }

            return options;
        },
        lOptions(): string[] {
            return this.options.map((opt) => opt.toLowerCase());
        },
        filteredOptions(): Array<{ index: number; text: string }> {
            if (!this.search) {
                return this.options.slice(0, 6).map((text, index) => ({
                    text,
                    index: index - (this.walls ? 0 : 1),
                }));
            }

            const options: { index: number; text: string }[] = [];
            const lSearch = this.search.toLowerCase();
            const end = this._enum['Count'] + (this.walls ? 0 : 1);

            for (let i = 0; i < end; i++) {
                if (
                    ~this.lOptions[i].indexOf(lSearch) &&
                    options.push({
                        text: this.options[i],
                        index: i - (this.walls ? 0 : 1),
                    }) === 6
                ) {
                    break;
                }
            }

            return options;
        },
        placeholder(): string {
            return this._enum[this.humanValue];
        },
    },
    emits: ['update:modelValue'],
    watch: {
        wall(n: number) {
            this.checkWallManualToggle(n);
        },
    },
    created() {
        this.checkWallManualToggle(this.wall);
    },
});
</script>
