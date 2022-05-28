<template>
    <div class="branch panel">
        <IconBtn
            type="delete"
            title="Delete this branch"
            @click.left="$emit('delete')"
        />

        <BoolToggle
            v-if="!first"
            title="Operator"
            :modelValue="!!b.or"
            @update:modelValue="b.or = $event || undefined"
            :options="['AND (&&)', 'OR (||)']"
        />

        <Toggle
            v-model="b.type"
            :options="branchTypes"
            title="If target"
            @beforeUpdate="changePayload"
        />

        <template
            v-if="
                b.type === EBranchType.BELOW_Y || b.type === EBranchType.ABOVE_Y
            "
        >
            <BoolToggle
                :options="['Numeric', 'Biomic']"
                v-model="yTypeEnum"
                title="Position type"
                @update:modelValue="b.payload = yTypeEnum ? -1 : 0"
            />

            <Toggle
                v-if="yTypeEnum"
                title="Y"
                :options="yTypes"
                :modelValue="-(b.payload + 1)"
                @update:modelValue="b.payload = -$event - 1"
            />

            <FormGroup v-else text="Y">
                <Input type="number" v-model="b.payload" min="0" max="10000" />
            </FormGroup>
        </template>

        <FormGroup
            v-else-if="
                b.type === EBranchType.ABOVE_X ||
                b.type === EBranchType.BEYOND_X
            "
            text="X"
        >
            <Input type="number" v-model="b.payload" />
        </FormGroup>

        <div v-else-if="b.type === EBranchType.IN_Y" class="y-types">
            <div
                v-for="(y, index) in yTypes"
                :key="index"
                :class="['panel', { selected: b.payload.includes(index) }]"
                @click.left="toggleYType(index)"
            >
                <Text sm>{{ y }}</Text>
            </div>
        </div>

        <!-- <FormGroup v-else-if="b.type === EBranchType.HAS_COLOR" text="Color">
            <Input v-model="b.payload" type="number" />
        </FormGroup> -->

        <!-- Can't use v-else because b.type inferred as number | {id: number, within: number} ???????? -->
        <template
            v-else-if="
                b.type === EBranchType.HAS_NEARBY_TILE ||
                b.type === EBranchType.HAS_NEARBY_WALL
            "
        >
            <FormGroup text="ID">
                <IconSelect
                    v-model="b.payload.id"
                    :wall="b.type === EBranchType.HAS_NEARBY_WALL ? 1 : 0"
                />
            </FormGroup>

            <FormGroup text="Within blocks">
                <Input type="number" v-model="b.payload.within" />
            </FormGroup>

            <Text sm class="warn">
                Warning: This may slow down swapping process
            </Text>
        </template>
    </div>
</template>

<style scoped>
.branch {
    width: 100%;
    padding: 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    position: relative;
}

.y-types {
    display: flex;
    gap: 0.5rem;
}

.y-types .panel {
    padding: 0.4rem;
    cursor: pointer;
}

.y-types .panel.selected {
    border-color: rgb(255, 231, 69);
}

.warn {
    color: rgb(255, 231, 69);
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BoolToggle from '@/components/Controls/BoolToggle.vue';
import Toggle from '@/components/Controls/Toggle.vue';
import { fromEnum } from '@/lib/utils';
import { EBranchType, EWorldYType } from '@/lib/enums';
import { SwapBranch } from '@/lib/types';
import IconBtn from '@/components/Controls/IconBtn.vue';
import Input from '@/components/Controls/Input.vue';
import FormGroup from '@/components/Controls/FormGroup.vue';
import IconSelect from '@/components/Controls/IconSelect.vue';
import Text from '@/components/Controls/Text.vue';

export default defineComponent({
    components: {
        BoolToggle,
        Toggle,
        IconBtn,
        Input,
        FormGroup,
        IconSelect,
        Text,
    },
    props: {
        branch: {
            type: Object as PropType<SwapBranch>,
            required: true,
        },
        first: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            branchTypes: fromEnum(EBranchType),
            EBranchType,
            yTypeEnum: this.branch.payload < 0,
            yTypes: fromEnum(EWorldYType),
        };
    },
    methods: {
        toggleYType(type: number) {
            if (this.b.type !== EBranchType.IN_Y) {
                return;
            }

            const index: number = this.b.payload.indexOf(type);

            if (~index) {
                this.b.payload.splice(index, 1);
            } else {
                this.b.payload.push(type);
            }
        },
        changePayload(n: EBranchType) {
            switch (n) {
                case EBranchType.IN_Y:
                    this.b.payload = [];
                    break;
                case EBranchType.HAS_NEARBY_TILE:
                case EBranchType.HAS_NEARBY_WALL:
                    this.b.payload = {
                        id: 0,
                        within: 1,
                    };
                    break;
                case EBranchType.ABOVE_Y:
                case EBranchType.BELOW_Y:
                    this.b.payload = this.yTypeEnum ? -1 : 0;
                    break;
                default:
                    this.b.payload = 0;
                    break;
            }
        },
    },
    computed: {
        b(): SwapBranch {
            return this.branch;
        },
    },
    emits: ['delete'],
});
</script>
