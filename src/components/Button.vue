<template>
    <div class="wrapper-btn">
        <button class="btn"
                :name="name"
                @click.prevent="onclick">{{ label }}</button>
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

<style scoped>
.wrapper-btn {
  display: flex;
  align-self: center;
  justify-content: center;
}

button {
  font-family: var(--font-family);
  font-size: var(--font-input-size);
  border: none;
  background: var(--second-bg);
  color: ivory;
  padding: 10px 15px;
  cursor: pointer;
}
</style>
