import { Mutations, Module } from 'vuex-smart-module';

export class AlertState {
  message!: string;
  display!: boolean;
};

export enum MutationTypes {
    setMessage = 'setMessage',
}

export class AlertMutations extends Mutations<AlertState> {
  [MutationTypes.setMessage](payload: string) {
    this.state.message = payload;
  };
};

export default new Module ({
  state: AlertState,
  mutations: AlertMutations,
});
