<template>
    <fieldset>
        <legend>
            <span class="accessibility">{{ legend }}</span>
        </legend>
        <label class="label">
            <span>{{ fixedLabel }}</span>
        </label>
        <slot></slot>
    </fieldset>
</template>

<script lang="ts">
import Vue from 'vue';

import Component from 'vue-class-component';

import { Prop } from 'vue-property-decorator';

@Component({
    name: 'InputWrapper',
})
export default class InputWrapper extends Vue {
    @Prop({ required: true }) readonly label!: string;

    @Prop() readonly legend!: string;

    get fixedLabel() {
        return `${this.label}:`;
    }
}
</script>

<style scoped>
fieldset {
    display: flex;
    flex-direction: column;
    border: none;
    width: 100%;
    padding: 0;
    margin-bottom: 20px;
}

label {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin-bottom: 5px;
    width: 100%;
}

label ~ input,
label ~ select {
    outline: none;
}

label:focus {
    border: 12px solid black;
}
</style>
