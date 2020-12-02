import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex from 'vuex';

import Home from '@/views/Home.vue';

import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login', () => {
    const build = () => {
        const wrapper: Wrapper<Home> = shallowMount(Home, {
            localVue,
        });

        const mountedWrapper: Wrapper<Home> = mount(Home, {
            localVue,
        });

        return {
            wrapper,
            productsCard: () => mountedWrapper.findAllComponents(Card).at(0),
            reportsCard: () => mountedWrapper.findAllComponents(Card).at(1),
            goBackButton: () => mountedWrapper.findComponent(Button),
        };
    };

    beforeEach(() => {
    });

    it('renders component', () => {
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders main child components', () => {
        const { goBackButton, productsCard, reportsCard } = build();

        expect(productsCard().exists()).toBe(true);
        expect(reportsCard().exists()).toBe(true);
        expect(goBackButton().exists()).toBe(true);
    });
});
