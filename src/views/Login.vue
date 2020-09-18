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
            <Button label="Login" :onclick="clickLogin" />
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

import { VuexAppModules } from '@/store/datatypes/models';

const login = namespace(VuexAppModules.login);

@Component({
    name: 'Login',
    components: {
        InputWrapper,
        TextInput,
        Button,
    },
})
export default class Login extends Vue implements LoginView {
    @login.State
    private username!: string;

    @login.Mutation
    private setUsername!: (username: string) => void;

    @login.State
    private password!: string;

    @login.Mutation
    private setPassword!: (password: string) => void;

    @login.Action
    public loginAction!: () => Promise<unknown>;

    public clickLogin(): Promise<unknown> {
        return this.loginAction();
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
