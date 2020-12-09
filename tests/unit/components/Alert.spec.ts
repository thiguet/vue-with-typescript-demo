import Vuex, { ActionTree, ModuleTree, MutationTree, Store } from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Alert from '@/components/Alert.vue';
import faker from 'faker';
import { State, ActionTypes } from '@/store/modules/alert';
import { VuexAppModules } from '@/store/datatypes/models';
import { AlertVuex } from '../store/models.d';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Alert', () => {
    let store: Store<State>;
    let alert: AlertVuex;

    const build = () => {
        const wrapper = shallowMount(Alert, {
            store,
            localVue,
        });

        return {
            wrapper,
            message: () => wrapper.find('.message'),
            closeBtn: () => wrapper.find('.close-btn'),
        };
    };

    beforeEach(() => {
        const state: State = {
            display: faker.random.boolean(),
            message: faker.lorem.text(),
        };

        const actions: ActionTree<MutationTree<State>, State> = {
            [ActionTypes.openAlert]: jest.fn(),
            [ActionTypes.closeAlert]: jest.fn(),
        };

        alert = {
            namespaced: true,
            state,
            mutations: {},
            actions,
        };

        const modules: ModuleTree<State> = {
            [VuexAppModules.alert]: {
                ...alert,
            },
        };

        store = new Vuex.Store({
            modules,
        });
    });

    it('renders component', () => {
        const { state } = alert;
        state.message = 'Some default text';
        state.display = true;
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders main components', () => {
        const { state } = alert;
        const bool = faker.random.boolean();
        state.display = bool;
        const { closeBtn, message } = build();

        expect(closeBtn().exists()).toBe(bool);
        expect(message().exists()).toBe(bool);
    });

    it('message text must be the same as props', () => {
        const { state } = alert;
        state.display = true;
        const { closeBtn, message } = build();

        expect(closeBtn().exists()).toBe(true);
        expect(message().exists()).toBe(true);
    });

    it('calls close fn on click', async () => {
        const { state } = alert;
        state.display = true;

        const { closeBtn } = build();
        const { closeAlert } = alert.actions;

        await closeBtn().trigger('click');

        expect(closeAlert).toHaveBeenCalled();
    });

    it('hides component on isVisible false', () => {
        const { state } = alert;

        state.display = false;

        const { message } = build();

        expect(message().exists()).toBe(false);
    });
});
