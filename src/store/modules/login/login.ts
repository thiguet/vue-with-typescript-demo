import {
  VuexModule,
  Module,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import { LoginState } from './models';

@Module({
  namespaced: true,
  name: 'login',
})
export default class Login extends VuexModule implements LoginState {
  username!: string;
  password!: string;

  @Mutation
  public setUsername(newUsername: string): void {
    this.username = newUsername;
  }

  @Mutation
  public setPassword(newPass: string): void {
    this.password = newPass;
  }
}