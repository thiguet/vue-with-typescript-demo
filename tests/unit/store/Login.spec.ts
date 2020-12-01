import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store';
import { ActionTypes, LoginState, MutationTypes } from '@/store/modules/login';

import  { login as loginPostCall } from '@/services/Login';

import faker from 'faker';

jest.mock('@/services/Login');

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

  it('calls the login API request on valid call', async () => {
    const login = faker.internet.userName();
    const pass  = faker.internet.password();

    const credentials = {
      login,
      pass,
    };
    
    await store.dispatch(namespace + ActionTypes.loginAction, credentials);

    expect(loginPostCall).toHaveBeenCalledWith(credentials);
  });
});
