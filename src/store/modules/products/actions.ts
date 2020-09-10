import { Actions as VActions, Getters } from 'vuex-smart-module';
import State from './state';
import Mutations from './mutations';
import { Product } from '@/store/datatypes/models.d';
import { MutationTypes } from './mutations';

export enum ActionTypes {
    newProduct = 'newProduct',
};

export default class Actions extends VActions<
  State,
  {} & Getters<State>,
  Mutations,
  Actions> {
  [ActionTypes.newProduct](payload: Product) {
    this.commit(MutationTypes.addProduct, payload);
  };
}