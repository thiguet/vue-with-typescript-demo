import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex, { Store, MutationTree, ActionTree } from 'vuex';

import Login from '@/views/Login.vue';

import Button from '@/components/Button.vue';
import TextInput from '@/components/TextInput.vue';

import faker from 'faker';
import { State } from '@/store/modules/login';

import { LoginView } from '@/views/models.d';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login', () => {
    let state: State;
    let mutations: MutationTree<State>;
    let actions: ActionTree<MutationTree<State>, State>;
    let store: Store<State>;

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
        };
    };

    beforeEach(() => {
        const name = faker.internet.userName();

        state = {
            currentUser: {
                id: faker.random.uuid(),
                name,
                email: name,
            },
            username: name,
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
            currentUser: {
                id: 'aljshdkgasjsvpu98hqoubqevhinlf',
                name: 'testing_username',
                email: 'someemail@a.com',
            },
            username: 'testing_username',
            password: '$@3sometest',
        };
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders main child components', () => {
        const { name, pass, btn } = build();

        expect(name().exists()).toBe(true);
        expect(pass().exists()).toBe(true);
        expect(btn().exists()).toBe(true);
    });

    it('passes vuex props to child components', () => {
        const { name, pass, btn } = build();

        expect(name().props().value).toBe(state.username);

        expect(pass().props().value).toBe(state.password);

        expect(btn().props().onclick).toBeInstanceOf(Function);
    });

    it('submit invalid login', async () => {
        state.username = '$#@¨&*(guyadshj';
        const { btn } = build();
        const { loginAction } = actions;

        await btn().trigger('click');
        expect(loginAction).not.toHaveBeenCalled();
    });

    it('submit valid login', async () => {
        const { btn } = build();
        const { loginAction } = actions;
        await btn().trigger('click');
        // Used to force the waiting for the desired methods.
        await setTimeout(() => expect(loginAction).toHaveBeenCalled(), 0);
    });

    it('calling clickLogin from vm', async () => {
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
});
