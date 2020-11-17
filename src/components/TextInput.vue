<template>
    <input
        :id="id"
        :type="type"
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
    name: 'TextInput',
})
export default class TextInput extends Vue {
    @Prop({ required: true }) readonly id!: string;

    @Prop({ default: 'text' }) readonly type!: string;

    @Prop({ required: true }) readonly value!: string;

    @Prop({ required: true }) readonly setValue!: Function;

    private onInput(e: Event) {
        this.setValue((e.target as HTMLInputElement).value);
    }
}
</script>

<style scoped>
input {
    border: none;
    border-bottom: 1px solid var(--border-color);
    width: 100%;
    font-family: inherit;
    font-size: var(--font-input-size);
}
</style>
