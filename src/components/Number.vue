<template>
    <input
        :id="id"
        type="number"
        :name="id"
        class="input"
        :value="value"
        @input="onInput"
    />
</template>

<script lang="ts">
import Vue from 'vue';

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
    name: 'Number',
})
export default class Number extends Vue {
    @Prop({ required: true }) readonly id!: string;

    @Prop({ required: false, default: '0' }) readonly min!: number;

    @Prop({ required: false }) readonly max!: number;

    @Prop({ required: true }) readonly value!: string;

    @Prop({ required: true }) readonly setValue!: Function;

    private onInput(event: { target: { value: string } }) {
        this.setValue(event.target.value);
    }
}
</script>

<style scoped></style>
