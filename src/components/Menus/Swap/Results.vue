<template>
    <div
        v-for="(result, rIndex) in logic.table"
        :key="rIndex"
        class="row panel"
    >
        <IconBtn
            type="delete"
            title="Delete this result"
            @click.left="_logic.table.splice(rIndex, 1)"
        />

        <div class="result-type">
            <Toggle
                :title="`Result ${rIndex + 1} type`"
                :options="resultTypes"
                :modelValue="
                    result.length > 2
                        ? EResultType.BOTH
                        : result[0] >= wallOffset
                        ? EResultType.WALL
                        : EResultType.TILE
                "
                @update:modelValue="toggleResultType(result)"
            />
        </div>

        <IconSelect
            v-model="result[0]"
            :wall="result[0] >= wallOffset ? 1 : 0"
        />

        <IconSelect v-if="result.length > 2" v-model="result[1]" :wall="1" />

        <Input
            class="percent"
            type="number"
            :modelValue="result.length > 2 ? result[2] : result[1]"
            @update:modelValue="result[result.length > 2 ? 2 : 1] = $event"
            min="1"
            max="100"
        >
            <Text sm class="perc-sign"> % </Text>
        </Input>
    </div>
</template>

<style scoped>
.result > .row + .row {
    margin-top: 1rem;
}

.result .row {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    padding: 0.4rem;
    position: relative;
}

.result-type {
    flex: 0 0 80%;
}

.percent {
    width: 100px;
    max-width: 100px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem;
}

.percent:deep(.content),
.percent:deep(.outline) {
    width: 100%;
}

.perc-sign {
    flex: 0 0 10%;
    margin-right: 0.4rem;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IconSelect from '@/components/Controls/IconSelect.vue';
import Toggle from '@/components/Controls/Toggle.vue';
import IconBtn from '@/components/Controls/IconBtn.vue';
import { SwapLogic } from '@/lib/types';
import { EResultType } from '@/lib/enums';
import { fromEnum } from '@/lib/utils';
import Input from '@/components/Controls/Input.vue';
import Text from '@/components/Controls/Text.vue';
import { wallOffset } from '@/lib/constants';

export default defineComponent({
    components: { IconSelect, Toggle, IconBtn, Input, Text },
    props: {
        logic: {
            type: Object as PropType<SwapLogic>,
            required: true,
        },
    },
    data() {
        return {
            resultTypes: fromEnum(EResultType),
            EResultType,
            wallOffset,
        };
    },
    computed: {
        _logic(): SwapLogic {
            return this.logic;
        },
    },
    methods: {
        toggleResultType(result: number[]) {
            if (result.length > 2) {
                result[1] = result[2];
                result[0] = 0;
                result.splice(2, 1);
            } else if (result[0] >= wallOffset) {
                const prec = result[1];
                result[1] = result[0];
                result[0] = 0;
                result.push(prec);
            } else {
                result[0] = wallOffset;
            }
        },
    },
});
</script>
