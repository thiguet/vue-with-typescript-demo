import { Actions as VActions } from 'vuex-smart-module';
import { Product } from '@/store/datatypes/models';
import {
    deleteProduct as deleteProductAPI,
    editProduct as editProductAPI,
    getAllProducts as getAllProductsAPI,
    newProduct as newProductAPI,
} from '@/services/Products';
import State from './state';
import Mutations, { MutationTypes } from './mutations';
import Getters from './getters';

export enum ActionTypes {
    fetchProducts = 'fetchProducts',
    newProduct = 'newProduct',
    editProduct = 'editProduct',
    saveProduct = 'saveProduct',
    selectProduct = 'selectProduct',
    deleteProduct = 'deleteProduct',
    resetSelectedProduct = 'resetSelectedProduct',
}

export default class Actions extends VActions<
    State,
    Getters,
    Mutations,
    Actions
> {
    [ActionTypes.saveProduct](payload: Product) {
        if (this.state.editMode) {
            editProductAPI(payload);
        } else {
            newProductAPI(payload);
        }

        this.commit(MutationTypes.addProduct, { ...payload });
        this.commit(MutationTypes.resetSelectedProduct);
    }

    [ActionTypes.newProduct]() {
        this.commit(MutationTypes.changeEditMode, false);
    }

    [ActionTypes.editProduct]() {
        this.commit(MutationTypes.changeEditMode, true);
    }

    [ActionTypes.selectProduct](payload: number) {
        this.commit(MutationTypes.selectProduct, payload);
    }

    [ActionTypes.deleteProduct](payload: number) {
        deleteProductAPI(this.state.products[payload]);
        this.commit(MutationTypes.deleteProduct, payload);
    }

    [ActionTypes.resetSelectedProduct]() {
        this.commit(MutationTypes.resetSelectedProduct);
    }

    async [ActionTypes.fetchProducts]() {
        const products = (await getAllProductsAPI()) || [];
        this.commit(MutationTypes.setProducts, products);
    }
}
