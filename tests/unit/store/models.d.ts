import { ActionTree, MutationTree } from 'vuex';
import { State as ProductsState } from '@/store/modules/products';
import { State as AlertState } from '@/store/modules/alert';

interface NamespacedVuexModule {
    namespaced?: boolean;
}

interface ProductsVuex extends NamespacedVuexModule {
    state: ProductsState;
    mutations: MutationTree<ProductsState>;
    actions: ActionTree<MutationTree<ProductsState>, ProductsState>;
}

interface AlertVuex extends NamespacedVuexModule {
    state: AlertState;
    mutations: MutationTree<AlertState>;
    actions: ActionTree<MutationTree<AlertState>, AlertState>;
}
