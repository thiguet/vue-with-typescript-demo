import { Mutations as VMutations } from 'vuex-smart-module';
import State from './state';
import { Product } from '@/store/datatypes/models.d';

export enum MutationTypes {
    setProduct = 'setProduct',
    addProduct = 'addProduct',
};

export default class Mutations extends VMutations<State> {
  [MutationTypes.setProduct](payload: Product) {
    this.state.selectedProduct = payload;
  }

  [MutationTypes.addProduct](payload: Product) {
    this.state.products.push(payload);
  }
};
