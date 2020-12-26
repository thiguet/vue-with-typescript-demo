import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex, { Store, ModuleTree } from 'vuex';

import Login from '@/views/Login.vue';

import Button from '@/components/Button.vue';
import TextInput from '@/components/TextInput.vue';

import faker from 'faker';
import {
    ActionTypes,
    MutationTypes,
    State as LoginState,
} from '@/store/modules/login';

import { LoginView } from '@/views/models.d';

import { LoginVuex } from '../store/models.d';

import { VuexAppModules } from '@/store/datatypes/models';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login', () => {
    let login: LoginVuex;
    let store: Store<LoginState>;

    const build = () => {
        const wrapper: Wrapper<Login> = shallowMount(Login, {
            localVue,
            store,
        });

        const mountedWrapper: Wrapper<Login> = mount(Login, {
            localVue,
            store,
        });

        return {
            wrapper,
            mountedWrapper,
            wrapperVM: (wrapper.vm as unknown) as LoginView,
            name: () => mountedWrapper.findAllComponents(TextInput).at(0),
            pass: () => mountedWrapper.findAllComponents(TextInput).at(1),
            btn: () => mountedWrapper.findComponent(Button),
            facebookIcon: () => mountedWrapper.find('#facebook'),
            githubIcon: () => mountedWrapper.find('#github'),
            googleIcon: () => mountedWrapper.find('#google'),
        };
    };

    beforeEach(() => {
        const name = faker.internet.userName();

        login = {
            namespaced: true,
            state: {
                currentUser: {
                    id: faker.random.uuid(),
                    name,
                    email: name,
                },
                username: name,
                password: faker.internet.password(),
            },
            mutations: {
                [MutationTypes.setUsername]: jest.fn(),
                [MutationTypes.setPassword]: jest.fn(),
            },
            actions: {
                [ActionTypes.loginAction]: jest.fn(),
                [ActionTypes.facebookLogin]: jest.fn(),
                [ActionTypes.githubLogin]: jest.fn(),
                [ActionTypes.googleLogin]: jest.fn(),
            },
        };

        const modules: ModuleTree<LoginState> = {
            [VuexAppModules.login]: {
                ...login,
            },
        };

        store = new Vuex.Store({
            modules,
        });
    });

    it('renders component', () => {
        login.state.currentUser = {
            id: 'aljshdkgasjsvpu98hqoubqevhinlf',
            name: 'testing_username',
            email: 'someemail@a.com',
        };
        login.state.username = 'testing_username';
        login.state.password = '$@3sometest';
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders main child components', () => {
        const {
            name,
            pass,
            btn,
            facebookIcon,
            githubIcon,
            googleIcon,
        } = build();

        expect(name().exists()).toBe(true);
        expect(pass().exists()).toBe(true);
        expect(btn().exists()).toBe(true);

        expect(facebookIcon().exists()).toBe(true);
        expect(githubIcon().exists()).toBe(true);
        expect(googleIcon().exists()).toBe(true);
    });

    it('passes vuex props to child components', () => {
        const { state } = login;

        const { name, pass, btn } = build();

        expect(name().props().value).toBe(state.username);

        expect(pass().props().value).toBe(state.password);

        expect(btn().props().onclick).toBeInstanceOf(Function);
    });

    it('submit invalid login', async () => {
        const { state, actions } = login;
        state.username = '$#@¨&*(guyadshj';
        const { btn } = build();
        const { loginAction } = actions;

        await btn().trigger('click');
        expect(loginAction).not.toHaveBeenCalled();
    });

    it('submit valid login', async () => {
        const { actions } = login;

        const { btn } = build();
        const { loginAction } = actions;
        await btn().trigger('click');
        // Used to force the waiting for the desired methods.
        await setTimeout(() => expect(loginAction).toHaveBeenCalled(), 0);
    });

    it('calling clickLogin from vm', async () => {
        const { actions } = login;
        const { wrapperVM } = build();
        const { loginAction } = actions;
        await wrapperVM.clickLogin();
        // Used to force the waiting for the desired methods.
        await setTimeout(() => expect(loginAction).toHaveBeenCalled(), 0);
    });

    it('must have a password input typed', async () => {
        const { pass } = build();
        expect(pass().props().type).toBe('password');
    });

    it('must call facebook login action', async () => {
        const { actions } = login;

        const { facebookIcon } = build();

        await facebookIcon().trigger('click');

        expect(actions.facebookLogin).toBeCalled();
    });
    it('must call github login action', async () => {
        const { actions } = login;

        const { githubIcon } = build();

        await githubIcon().trigger('click');

        expect(actions.githubLogin).toBeCalled();
    });
    it('must call google login action', async () => {
        const { actions } = login;

        const { googleIcon } = build();

        await googleIcon().trigger('click');

        expect(actions.googleLogin).toBeCalled();
    });
});
