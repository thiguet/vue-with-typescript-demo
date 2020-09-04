import { Mutations, Module } from 'vuex-smart-module';
import { Product } from '@/store/datatypes/models.d';

export class ProductsState {
  selectedProduct!: Product;
};

export class ProductsMutations extends Mutations<ProductsState> {
  setProduct(payload: Product) {
    this.state.selectedProduct = payload
  };
};

export default new Module ({
  state: ProductsState,
  mutations: ProductsMutations,
});
