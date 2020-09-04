import { Mutations, Module } from 'vuex-smart-module';

export class LoginState {
  username!: string;
  password!: string;
};

export enum MutationTypes {
  setPassword = 'setPassword',
  setUsername = 'setUsername', 
};

export class LoginMutations extends Mutations<LoginState> {
  [MutationTypes.setPassword](payload: string) {
    this.state.password = payload;
  };
  [MutationTypes.setUsername](payload: string) {
    this.state.username = payload;
  };
};

export default new Module ({
  state: LoginState,
  mutations: LoginMutations,
});
