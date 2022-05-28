<template>
    <div class="logic-list block">
        <Text v-if="_mission.logic.length > 0" sm class="title"> Logic </Text>

        <div
            v-for="(logic, index) in _mission.logic"
            :key="index"
            class="logic panel"
        >
            <IconBtn
                type="delete"
                title="Delete this logic"
                @click.left="_mission.logic.splice(index, 1)"
            />

            <FormGroup text="Logic name">
                <Input v-model="logic.name" maxlength="20" />
            </FormGroup>

            <FormGroup text="Target">
                <IconSelect v-model="logic.target" />
            </FormGroup>

            <div class="in-block">
                <Text
                    v-if="logic.branches && logic.branches.length > 0"
                    sm
                    class="in-header"
                >
                    Branches
                </Text>

                <Branch
                    v-for="(branch, index) in logic.branches || []"
                    :key="index"
                    :branch="branch"
                    :first="index === 0"
                    @delete="logic.branches!.splice(index, 1)"
                />

                <Button sm @click.left="addBranch(logic)"> Add branch </Button>
            </div>

            <div class="in-block result">
                <Text v-if="logic.table.length > 0" sm class="in-header">
                    Result table
                </Text>

                <Results :logic="logic" />

                <Button sm @click.left="logic.table.push([0, 100])">
                    Add result
                </Button>
            </div>
        </div>

        <Button sm @click.left="addLogic"> Add logic </Button>
    </div>
</template>

<style scoped>
.logic-list .btn {
    align-self: center;
}

.logic {
    background: rgba(54, 72, 139, 0.65);
    border-color: rgba(79, 124, 193, 0.5);
    width: 100%;
    padding: 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    position: relative;
}

.logic:deep(.icon-btn) {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
}

.in-block {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.in-block .in-header {
    width: 100%;
    position: relative;
    text-align: center;
    margin-bottom: 1rem;
}

.in-block .in-header:deep(.outline) {
    text-align: center;
    width: 100%;
}

.in-block > .btn {
    align-self: center;
    margin-top: 1rem;
}

.in-block .in-header::after {
    display: block;
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: calc(100% + 1rem);
    transform: translateX(-0.5rem);
    height: 2px;
    background: rgba(79, 124, 193, 0.5);
    z-index: 0;
}

.in-block > .branch + .branch {
    margin-top: 1rem;
}

.logic:deep(.link) {
    --size: 1.5rem;
}

.logic:deep(.link:hover) {
    transform: scale(1) !important;
}
</style>

<script lang="ts">
import { SwapLogic, SwapMission } from '@/lib/types';
import { defineComponent, PropType } from 'vue';
import Text from '@/components/Controls/Text.vue';
import Button from '@/components/Controls/Button.vue';
import IconBtn from '@/components/Controls/IconBtn.vue';
import IconSelect from '@/components/Controls/IconSelect.vue';
import FormGroup from '@/components/Controls/FormGroup.vue';
import Input from '@/components/Controls/Input.vue';
import { EBranchType } from '@/lib/enums';
import Branch from './Branch.vue';
import Results from './Results.vue';

export default defineComponent({
    components: {
        Text,
        IconBtn,
        IconSelect,
        FormGroup,
        Button,
        Input,
        Branch,
        Results,
    },
    props: {
        mission: {
            type: Object as PropType<SwapMission>,
            required: true,
        },
    },
    computed: {
        _mission(): SwapMission {
            return this.mission;
        },
    },
    methods: {
        addLogic() {
            this._mission.logic.push({
                name: 'New logic',
                target: 0,
                table: [],
                branches: [],
            });
        },
        addBranch(logic: SwapLogic) {
            if (!logic.branches) {
                logic.branches = [];
            }

            logic.branches.push({
                payload: 0,
                type: EBranchType.BELOW_Y,
            });
        },
    },
});
</script>
