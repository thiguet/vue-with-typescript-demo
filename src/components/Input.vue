<template>
    <fieldset>
        <legend>{{legend}}</legend>
        <label class="label">{{ label }}</label>
        <input :id="id"
                class="input"
                v-bind:value="value"
                v-on:input="setValue" />
    </fieldset>
</template>

<script lang="ts">
import Vue from 'vue';

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
  name: 'Input',
})
export default class Input extends Vue {
    @Prop({ required: true }) readonly id!: string;

    @Prop({ required: true }) readonly label!: string;

    @Prop({ required: true }) readonly type!: string;

    @Prop({ required: true }) readonly value!: string;

    @Prop({ required: true }) readonly setValue!: Function;

    @Prop() readonly legend!: string;
}
</script>

<style scoped>
</style>
