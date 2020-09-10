import { Actions as VActions, Getters } from 'vuex-smart-module';
import { Product } from '@/store/datatypes/models.d';
import State from './state';
import Mutations, { MutationTypes } from './mutations';

export enum ActionTypes {
    newProduct = 'newProduct',
}

export default class Actions extends VActions<
  State,
  {} & Getters<State>,
  Mutations,
  Actions> {
  [ActionTypes.newProduct](payload: Product) {
    this.commit(MutationTypes.addProduct, payload);
  }
}
