import { Mutations as VMutations } from 'vuex-smart-module';
import { Product } from '@/store/datatypes/models';
import State from './state';

export enum MutationTypes {
    setProduct = 'setProduct',
    addProduct = 'addProduct',
}

export default class Mutations extends VMutations<State> {
    [MutationTypes.setProduct](payload: Product) {
        this.state.selectedProduct = payload;
    }

    [MutationTypes.addProduct](payload: Product) {
        this.state.products.push(payload);
    }
}
