import { Module } from 'vuex-smart-module';
import State from './state';
import Mutations, { MutationTypes } from './mutations';
import Actions, { ActionTypes } from './actions';

export { State, Mutations, MutationTypes, Actions, ActionTypes };

export default new Module({
    state: State,
    mutations: Mutations,
    actions: Actions,
});
