import { Mutations as VMutations } from 'vuex-smart-module';
import { Measures, Product } from '@/store/datatypes/models';
import State from './state';

export enum MutationTypes {
    resetSelectedProduct = 'resetSelectedProduct',
    setProduct = 'setProduct',
    addProduct = 'addProduct',
    setProductName = 'setProductName',
    setProductQtd = 'setProductQtd',
    setProductMinQtd = 'setProductMinQtd',
    setProductMeasure = 'setProductMeasure',
    setProductImage = 'setProductImage',
    selectProduct = 'selectProduct',
    deleteProduct = 'deleteProduct',
}

export default class Mutations extends VMutations<State> {
    [MutationTypes.resetSelectedProduct]() {
        Object.assign(this.state.selectedProduct, new State().selectedProduct);
    }

    [MutationTypes.setProduct](payload: Product) {
        this.state.selectedProduct = payload;
    }

    [MutationTypes.addProduct](payload: Product) {
        this.state.products.push(payload);
    }

    [MutationTypes.setProductName](payload: string) {
        this.state.selectedProduct.name = payload;
    }

    [MutationTypes.setProductQtd](payload: number) {
        this.state.selectedProduct.qtd = payload > 0 ? payload : 0;
    }

    [MutationTypes.setProductMinQtd](payload: number) {
        this.state.selectedProduct.minQtd = payload > 0 ? payload : 0;
    }

    [MutationTypes.setProductMeasure](payload: Measures) {
        this.state.selectedProduct.measure = payload;
    }

    [MutationTypes.setProductImage](payload: string) {
        this.state.selectedProduct.image = payload;
    }

    [MutationTypes.selectProduct](payload: number) {
        this.state.selectedProduct = { ...this.state.products[payload] };
    }

    [MutationTypes.deleteProduct](payload: number) {
        this.state.products.splice(payload, 1);
    }
}
