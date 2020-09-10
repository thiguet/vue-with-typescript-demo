import {
  shallowMount, mount, createLocalVue, Wrapper,
} from '@vue/test-utils';

import Vuex, { Store } from 'vuex';

import Login from '@/views/Login.vue';

import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';

import faker from 'faker';
import { LoginState } from '@/store/modules/login';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login', () => {
  let state: LoginState;
  let mutations: any;
  let actions: any;
  let store: Store<LoginState>;

  const build = () => {
    // Now we can change state, before a running test.
    store = new Vuex.Store({
      modules: {
        login: {
          namespaced: true,
          state,
          mutations,
          actions,
        },
      },
    });

    type VueComponentKey = any;

    const wrapper: Wrapper<Login & { [key: string]: VueComponentKey }> = shallowMount(Login, {
      localVue,
      store,
    });

    const mountedWrapper: Wrapper<Login & { [key: string]: VueComponentKey }> = mount(Login, {
      localVue,
      store,
    });

    return {
      wrapper,
      mountedWrapper,
      name: () => mountedWrapper.findAllComponents(Input).at(0),
      pass: () => mountedWrapper.findAllComponents(Input).at(1),
      btn: () => mountedWrapper.findComponent(Button),
    };
  };

  beforeEach(() => {
    state = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    mutations = {
      setUsername: jest.fn(),
      setPassword: jest.fn(),
    };

    actions = {
      loginAction: jest.fn(),
    };
  });

  it('renders component', () => {
    state = {
      username: 'testing_username',
      password: '$@3sometest',
    };
    const { wrapper } = build();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders main child components', () => {
    const {
      name,
      pass,
      btn,
    } = build();

    expect(name().exists()).toBe(true);
    expect(pass().exists()).toBe(true);
    expect(btn().exists()).toBe(true);
  });

  it('passes vuex props to child components', () => {
    const {
      name,
      pass,
      btn,
    } = build();

    expect(name().props().value).toBe(state.username);
    expect(name().props().setValue).toBeInstanceOf(Function);

    expect(pass().props().value).toBe(state.password);
    expect(pass().props().setValue).toBeInstanceOf(Function);

    expect(btn().props().onclick).toBeInstanceOf(Function);
  });

  it('submit invalid login', async () => {
    state.username = '$#@¨&*(guyadshj';
    const {
      btn,
    } = build();
    const { loginAction } = actions;

    await btn().trigger('click');
    expect(loginAction).not.toHaveBeenCalled();
  });

  it('submit valid login', async () => {
    const {
      btn,
    } = build();
    const { loginAction } = actions;
    await btn().trigger('click');
    // Used to force the waiting for the desired methods.
    setTimeout(() => expect(loginAction).toHaveBeenCalled(), 0);
  });

  it('calling clickLogin from vm', async () => {
    const { wrapper } = build();
    const { loginAction } = actions;
    await wrapper.vm.clickLogin();
    // Used to force the waiting for the desired methods.
    setTimeout(() => expect(loginAction).toHaveBeenCalled(), 0);
  });

  it('must have a password input typed', async () => {
    const { pass } = build();
    expect(pass().props().type).toBe('password');
  });
});
