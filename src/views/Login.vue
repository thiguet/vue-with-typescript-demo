<template>
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

const login = namespace(VuexAppModules.login);

const { State, Mutation, Action } = login;

@Component({
    name: 'Login',
    components: {
        InputWrapper,
        TextInput,
        Button,
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

    public clickLogin(): Promise<unknown> {
        const loginData: LoginSubmit = {
            name: this.username,
            pass: this.password,
        };

        return this.loginAction(loginData);
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}
</style>
