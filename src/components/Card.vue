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
    padding: 10px;
    background-color: var(--ternary-bg);
    height: 75vh;
    width: 40vw;
}

.container > img {
    max-width: 150px;
    max-height: 150px;
    align-self: center;
}

@media screen and (max-width: 600px) {
    .container {
        padding: 0;
        height: 35vh;
        width: 100%;
    }

    .container > img {
        max-width: 120px;
        max-height: 120px;
    }
}

</style>
