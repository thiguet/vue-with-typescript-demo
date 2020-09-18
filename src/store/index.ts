import Vue from 'vue';
import Vuex from 'vuex';
import { createStore, Module } from 'vuex-smart-module';

import LoginModule from '@/store/modules/login';
import ProductsModule from '@/store/modules/products';
import AlertModule from '@/store/modules/alert';

Vue.use(Vuex);

const root = new Module({
  modules: {
    products: ProductsModule,
    login: LoginModule,
    alert: AlertModule,
  },
});

export default createStore(
  root,
  {
    strict: process.env.NODE_ENV !== 'production',
  },
);
