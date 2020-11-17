import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store';
import { LoginState, MutationTypes } from '@/store/modules/login';

import faker from 'faker';

Vue.use(Vuex);

const namespace = 'login/';

describe('Login Vuex Module', () => {
  let state: LoginState;

  beforeEach(() => {
    state = store.state.login;
  });

  it('sets the username to the state.', () => {
    const newUsername = faker.internet.userName();

    store.commit(namespace + MutationTypes.setUsername, newUsername);

    expect({...state}).toEqual({
      ...state,
      username: newUsername,
    });
  });

  it('sets the password to the state.', () => {
    const newPassword = faker.internet.password();

    store.commit(namespace + MutationTypes.setPassword, newPassword);

    expect({...store.state.login}).toEqual({
      ...state,
      password: newPassword,
    });
  });
});
