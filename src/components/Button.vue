<template>
    <div class="wrapper-btn">
        <button :id="id" class="btn" :name="name" @click.prevent="onclick">
            <img class="icon" v-if="icon" :src="icon" :alt="name" />
            <span v-else>{{ label }} </span>
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { Prop, Component } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
    @Prop({ required: true }) readonly id!: string;

    @Prop({ required: true }) readonly name!: string;

    @Prop({ required: true }) readonly onclick!: Function;

    @Prop() readonly label!: string;

    @Prop() readonly icon!: string;
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
    background-color: var(--second-bg);
    color: #fff;
    padding: 10px 15px;
    outline-offset: -4px;
    cursor: pointer;
}
</style>
