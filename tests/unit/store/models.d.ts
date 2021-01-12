import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { State as ProductsState } from '@/store/modules/products';
import { State as ReportsState } from '@/store/modules/reports';
import { State as AlertState } from '@/store/modules/alert';
import { State as LoginState } from '@/store/modules/login';

interface NamespacedVuexModule {
    namespaced?: boolean;
}

export interface LoginVuex extends NamespacedVuexModule {
    state: LoginState;
    mutations: MutationTree<LoginState>;
    actions: ActionTree<MutationTree<LoginState>, LoginState>;
}

export interface ProductsVuex extends NamespacedVuexModule {
    state: ProductsState;
    getters: GetterTree<{}, ProductsState>;
    mutations: MutationTree<ProductsState>;
    actions: ActionTree<MutationTree<ProductsState>, ProductsState>;
}

export interface AlertVuex extends NamespacedVuexModule {
    state: AlertState;
    mutations: MutationTree<AlertState>;
    actions: ActionTree<MutationTree<AlertState>, AlertState>;
}

export interface ReportsVuex extends NamespacedVuexModule {
    state: ReportsState;
    getters: GetterTree<{}, ReportsState>;
    mutations: MutationTree<ReportsState>;
    actions: ActionTree<MutationTree<ReportsState>, ReportsState>;
}
