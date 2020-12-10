import { Module } from 'vuex-smart-module';
import State from './state';
import Getters, { GettersTypes } from './getters';
import Mutations, { MutationTypes } from './mutations';
import Actions, { ActionTypes } from './actions';

export {
    State,
    Mutations,
    MutationTypes,
    Getters,
    GettersTypes,
    Actions,
    ActionTypes,
};

export default new Module({
    state: State,
    mutations: Mutations,
    getters: Getters,
    actions: Actions,
});
