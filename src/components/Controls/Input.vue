<template>
    <div class="input">
        <div
            class="content"
            contenteditable="true"
            @input="updateValue"
            v-bind="$attrs"
            ref="content"
        >
            {{ value }}
        </div>

        <div class="outline" ref="outline">
            {{ value }}
        </div>

        <slot />
    </div>
</template>

<style scoped>
.input {
    border-radius: 10px;
    background: rgba(74, 96, 169, 0.65);
    border: 2px solid rgba(13, 13, 14, 0.95);
    color: white;
    position: relative;
    z-index: 1;
    max-width: 200px;
    width: 200px;
    overflow-x: scroll;
    overflow-y: hidden;
    display: inline-block;
    box-sizing: border-box;
}

.input::-webkit-scrollbar {
    display: none;
}

.input:focus-within {
    border-color: rgb(255, 231, 69);
}

.content {
    white-space: nowrap;
    padding: 0.4rem 0.5rem;
    height: 100%;
}

.content:focus {
    outline: none;
}

.outline {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    color: transparent;
    -webkit-text-stroke: 3.5px black;
    z-index: -1;
    white-space: nowrap;
    margin: 0.4rem 0.5rem;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        modelValue: {
            type: [Number, String],
            required: true,
        },
        min: [Number, String],
        max: [Number, String],
        maxlength: [Number, String],
    },
    methods: {
        updateValue(e: Event) {
            let value: string | number = (e.target as HTMLDivElement).innerText;

            if (this.$attrs.type === 'number' && value) {
                value = parseInt(value);
                const _e = e as InputEvent;

                if (isNaN(value) || (_e.data && !/[\d-]/g.test(_e.data))) {
                    this.updateText(this.value);
                    return;
                }

                if (this._min && this._min > value) {
                    value = this._min;
                    this.updateText(value);
                } else if (this._max && this._max < value) {
                    value = this._max;
                    this.updateText(value);
                }
            }

            if (this._maxlength && this._maxlength < value.toString().length) {
                this.updateText(this.value);
                return;
            }

            this.value = value;

            if (this.value.toString() === '') {
                this.$el.scrollX = 0;
            }
        },
        updateText(text: string | number) {
            (this.$refs.outline as HTMLDivElement).innerHTML = text + '';
            (this.$refs.content as HTMLDivElement).innerHTML = text + '';
        },
    },
    computed: {
        value: {
            get(): number | string {
                return this.modelValue;
            },
            set(value: number | string) {
                this.$emit('update:modelValue', value);
            },
        },
        _min(): number | undefined {
            if (!this.min) {
                return undefined;
            }

            return typeof this.min === 'string' ? parseInt(this.min) : this.min;
        },
        _max(): number | undefined {
            if (!this.max) {
                return undefined;
            }

            return typeof this.max === 'string' ? parseInt(this.max) : this.max;
        },
        _maxlength(): number | undefined {
            if (!this.maxlength) {
                return undefined;
            }

            return typeof this.maxlength === 'string'
                ? parseInt(this.maxlength)
                : this.maxlength;
        },
    },
    emits: ['update:modelValue'],
});
</script>
