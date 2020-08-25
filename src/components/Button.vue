<template>
    <div class="wrapper-btn">
        <button class="btn"
                :name="name"
                @click="onclick">{{ label }}</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
    @Prop({ required: true }) readonly label!: string;

    @Prop({ required: true }) readonly onclick!: Function;
}
</script>
