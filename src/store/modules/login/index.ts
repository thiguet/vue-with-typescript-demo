import { Module } from 'vuex-smart-module';
import Mutations, { MutationTypes } from './mutations';
import Actions, { ActionTypes } from './actions';
import State from './state';

export { State, Mutations, MutationTypes, Actions, ActionTypes };

export default new Module({
    state: State,
    mutations: Mutations,
    actions: Actions,
});
