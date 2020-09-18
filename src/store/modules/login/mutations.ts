import { Mutations as VMutations } from 'vuex-smart-module';
import State from './state';

export enum MutationTypes {
  setPassword = 'setPassword',
  setUsername = 'setUsername',
}

export default class Mutation extends VMutations<State> {
  [MutationTypes.setPassword](payload: string) {
    this.state.password = payload;
  }

  [MutationTypes.setUsername](payload: string) {
    this.state.username = payload;
  }
}
