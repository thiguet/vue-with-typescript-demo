<template>
    <div class="box-container">
        <div class="box">
            <slot></slot>
        </div>
        <div class="info">
            <p>
                {{ boxTitle }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class ScalerBox extends Vue {
    @Prop() private readonly boxTitle!: string;
}
</script>

<style>
.box-container {
    margin-top: 20px;
    padding: 20px;
    cursor: pointer;
    flex-flow: column;
    width: auto;
}

.box-container:hover .box > *,
.box-container:focus .box > * {
    transform: scale(1.5);
}

.box {
    width: auto;
    display: flex;
    margin-right: 0;
    filter: none;
    transition: all 0.3s ease;
}

.info,
.box {
    justify-content: center;
}

@media screen and (max-width: 600px) {
    .box-container {
        padding: 0;
    }
}
</style>
