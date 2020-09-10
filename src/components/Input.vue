<template>
    <fieldset>
        <legend>
            <span class="accessibility">{{ legend  }}</span>
        </legend>
        <label :for="id" class="label">{{ label }}</label>
        <input  :id="id"
                :type="type"
                :name="id"
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

    @Prop({ required: true }) readonly value!: string;

    @Prop({ required: true }) readonly setValue!: Function;

    @Prop({ default: 'text' }) readonly type!: string;

    @Prop() readonly legend!: string;
}
</script>

<style scoped>
fieldset {
    display: flex;
    flex-direction: row;
    flex-flow: row;
    border: none;
    width: 100%;
}

input {
    border: none;
    border-bottom: 1px solid var(--border-color);
    width: 100%;
    font-family: inherit;
    font-size: var(--font-input-size);
}

label {
    margin-bottom: 5px;
}

label:after {
    content: ':';
}

legend span.accessibility {
    position:absolute;
    left:-9999px;
    width:100px;
    height:auto;
    overflow:hidden;
}
</style>
