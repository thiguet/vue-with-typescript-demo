<template>
  <div class="about">
    <form class="form">
      <Input id="email"
             type="text"
             label="Login"
             :value="username"
             :setValue="setUsername" />
      <Input id="pass"
             type="text"
             label="Senha"
             :value="password"
             :setValue="setPassword" />
      <Button label="Login"
              :onclick="clickLogin" />
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';

import { namespace } from 'vuex-class';
import { LoginView } from '@/views/models.d';

const login = namespace('login');

@Component({
  name: 'Login',
  components: {
    Input,
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
.form-field {
  border: none;
  display: flex;
}

.form {
  display: flex;
  flex-direction: column;
  flex-flow: column;
  width: 100px;
}
</style>
