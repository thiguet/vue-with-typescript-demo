<template>
    <div class="wrapper">
        <div class="login">
            <form class="form">
                <InputWrapper label="Login" legend="Login">
                    <TextInput
                        id="email"
                        :value="username"
                        :setValue="setUsername"
                    />
                </InputWrapper>
                <InputWrapper label="Senha" legend="Password">
                    <TextInput
                        id="pass"
                        type="password"
                        :value="password"
                        :setValue="setPassword"
                    />
                </InputWrapper>
                <Button
                    id="login"
                    name="login"
                    label="Login"
                    :onclick="clickLogin"
                />
            </form>
        </div>
        <div class="other-apps-login">
            <div class="app-login">
                <a :href="`${baseURL}/auth/facebook`"
                    ><img
                        id="facebook"
                        src="/assets/icons/facebook.svg"
                        @click="clickFacebookIcon"
                /></a>
            </div>
            <div class="app-login">
                <a :href="`${baseURL}/auth/instagram`"
                    ><img
                        id="instagram"
                        src="/assets/icons/instagram.svg"
                        @click="clickInstagramIcon"
                /></a>
            </div>
            <div class="app-login">
                <a :href="`${baseURL}/auth/google`"
                    ><img
                        id="google"
                        src="/assets/icons/google.svg"
                        @click="clickGoogleIcon"
                /></a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import InputWrapper from '@/components/InputWrapper.vue';
import TextInput from '@/components/TextInput.vue';
import Button from '@/components/Button.vue';

import { namespace } from 'vuex-class';
import { LoginView } from '@/views/models.d';

import { LoginSubmit, VuexAppModules } from '@/store/datatypes/models';

import {
    Mutations,
    MutationTypes,
    Actions,
    ActionTypes,
} from '@/store/modules/login';

import { baseURL } from '@/services/config.json';

const login = namespace(VuexAppModules.login);

const { State, Mutation, Action } = login;

@Component({
    name: 'Login',
    components: {
        InputWrapper,
        TextInput,
        Button,
    },
    data() {
        return { baseURL };
    },
})
export default class Login extends Vue implements LoginView {
    @State
    private username!: string;

    @State
    private password!: string;

    @Mutation
    private setUsername!: Mutations[MutationTypes.setUsername];

    @Mutation
    private setPassword!: Mutations[MutationTypes.setPassword];

    @Action
    public loginAction!: Actions[ActionTypes.loginAction];

    @Action
    public facebookLogin!: Actions[ActionTypes.facebookLogin];

    @Action
    public instagramLogin!: Actions[ActionTypes.instagramLogin];

    @Action
    public googleLogin!: Actions[ActionTypes.googleLogin];

    public clickLogin(): Promise<unknown> {
        const loginData: LoginSubmit = {
            name: this.username,
            pass: this.password,
        };

        return this.loginAction(loginData);
    }

    public clickFacebookIcon(): Promise<unknown> {
        return this.facebookLogin();
    }

    public clickInstagramIcon(): Promise<unknown> {
        return this.instagramLogin();
    }

    public clickGoogleIcon(): Promise<unknown> {
        return this.googleLogin();
    }
}
</script>

<style scoped>
.form {
    display: flex;
    flex-flow: column;
}

.about {
    display: flex;
    flex-flow: row;
    width: 100vw;
    align-items: center;
    justify-content: center;
}

.form > fieldset {
    width: 70vw;
}

.login {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    margin-top: 30vh;
}

.other-apps-login {
    margin-top: 60px;
}

.app-login {
    justify-content: center;
}

.app-login img {
    filter: none;
    width: 60px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.app-login img:hover {
    transform: scale(1.5);
}

.wrapper {
    flex-direction: column;
}
</style>
