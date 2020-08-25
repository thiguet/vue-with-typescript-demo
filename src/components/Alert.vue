<template>
    <div v-if="isVisible">
        <span class="message">{{ message }}</span>
        <button class="close-btn" @click="closeFn"></button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
    name: 'Message',
})
export default class Message extends Vue {
    @Prop({required: true}) private readonly isVisible!: boolean;
    @Prop({required: true}) private readonly message!: string;
    @Prop({required: true}) private readonly closeFn!: string;
}
</script>

<style>
</style>
