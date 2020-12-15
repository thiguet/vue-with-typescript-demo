<template>
    <div class="container" @click="onclick">
        <img :src="icon" />
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
    @Prop({ required: true }) readonly onclick!: Function;

    @Prop({ required: true }) readonly icon!: string;
}
</script>

<style>
.container {
    cursor: pointer;
    justify-content: center;
    padding: 0px;
    background-color: var(--ternary-bg);
    height: 70vh;
    width: 300px;
}

.container > img {
    max-width: 150px;
    max-height: 150px;
    align-self: center;
}

@media screen and (max-width: 600px) {
    .container {
        height: 32vh;
        padding: 10px;
        width: 85%;
        justify-content: center;
        align-self: center;
        margin-top: 20px;
    }

    .container > img {
        max-width: 120px;
        max-height: 120px;
    }
}
</style>
