<template>
    <div class="alert-bg" v-if="display">
        <div class="alert-card">
            <div class="alert-header">
                <h3 class="title">{{title}}</h3>
            </div>
            <div class="alert-mid">
                <span class="message">{{ message }}</span>
            </div>
            <div class="alert-bottom">
                <button class="close-btn" @click="closeAlert">Fechar</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { VuexAppModules } from '@/store/datatypes/models';
import { Actions, ActionTypes } from '@/store/modules/alert';

import Vue from 'vue';

import Component from 'vue-class-component';

import { namespace } from 'vuex-class';

const alert = namespace(VuexAppModules.alert);

const { State, Action } = alert;

@Component({
    name: 'Alert',
})
export default class Alert extends Vue {
    @State
    display!: boolean;

    @State
    message!: string;

    @State
    title!: string;

    @Action
    closeAlert!: Actions[ActionTypes.closeAlert];
}
</script>

<style scoped>
.alert-bg {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
}

.alert-card {
    display: flex;
    position: relative;
    top: 20%;
    left: 15vw;
    width: 70vw;
    height: 40vh;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: #fff;
    padding: 20px;
    box-shadow: 1px 1px 10px black;
    border-radius: 5px;
}

.alert-header {
    align-self: center;
}

.alert-bottom {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
    align-self: center;
}

.alert-bottom > button {
    margin-top: 10px;
}

button {
    padding: 10px;
    cursor: pointer;
    border: none;
    outline-offset: -4px;
    font-family: var(--font-family);
    color: #fff;
    background-color: var(--second-bg);
}

.alert-mid {
    align-self: center;
    height: 35%;
}
.message {
    align-self: center;
    text-align: center;
}
</style>
