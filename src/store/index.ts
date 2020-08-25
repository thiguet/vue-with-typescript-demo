import Vue from 'vue';
import Vuex from 'vuex';
import Login from '@/store/modules/login/login';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login: Login,
  },
});
