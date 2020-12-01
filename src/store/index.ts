import Vue from 'vue';
import Vuex from 'vuex';
import { createStore, Module } from 'vuex-smart-module';

import LoginModule from '@/store/modules/login';
import ProductsModule from '@/store/modules/products';
import AlertModule from '@/store/modules/alert';
import { VuexAppModules } from './datatypes/models';

Vue.use(Vuex);

const root = new Module({
    modules: {
        [VuexAppModules.products]: ProductsModule,
        [VuexAppModules.login]: LoginModule,
        [VuexAppModules.alert]: AlertModule,
    },
});

export default createStore(
    root,
    {
        strict: process.env.NODE_ENV !== 'production',
    },
);
