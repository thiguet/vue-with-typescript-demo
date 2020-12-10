import { Actions as VActions } from 'vuex-smart-module';
import { Product } from '@/store/datatypes/models';
import State from './state';
import Mutations, { MutationTypes } from './mutations';
import Getters from './getters';

export enum ActionTypes {
    saveProduct = 'saveProduct',
    selectProduct = 'selectProduct',
    deleteProduct = 'deleteProduct',
}

export default class Actions extends VActions<
    State,
    Getters,
    Mutations,
    Actions
> {
    [ActionTypes.saveProduct](payload: Product) {
        this.commit(MutationTypes.addProduct, { ...payload });
        this.commit(MutationTypes.resetState);
    }

    [ActionTypes.selectProduct](payload: number) {
        this.commit(MutationTypes.selectProduct, payload);
    }

    [ActionTypes.deleteProduct](payload: number) {
        this.commit(MutationTypes.deleteProduct, payload);
    }
}
