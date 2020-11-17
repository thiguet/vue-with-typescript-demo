import { Module } from 'vuex-smart-module';
import LoginMutations, { MutationTypes as MTypes } from './mutations';
import LoginActions, { ActionTypes as ATypes } from './actions';
import State from './state';

export type LoginState = State;
export const Mutations = LoginMutations;
export const MutationTypes = MTypes;
export const Actions = LoginActions;
export const ActionTypes = ATypes;

export default new Module({
    state: State,
    mutations: LoginMutations,
    actions: LoginActions,
});
