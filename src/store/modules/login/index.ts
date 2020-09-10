import { Module } from 'vuex-smart-module';
import LoginMutations, { MutationTypes as MTypes } from './mutations';
import State from './state';

export const LoginState = State;
export const MutationTypes = MTypes;

export default new Module ({
  state: State,
  mutations: LoginMutations,
});
