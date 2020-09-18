import { Module } from 'vuex-smart-module';
import State from './state';
import ProductsMutations, { MutationTypes as MTypes } from './mutations';
import ProductsActions, { ActionTypes as ATypes } from './actions';

export type ProductsState = State;
export const MutationTypes = MTypes;
export const ActionTypes = ATypes;

export default new Module({
  state: State,
  mutations: ProductsMutations,
  actions: ProductsActions,
});
