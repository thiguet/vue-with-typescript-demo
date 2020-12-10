import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex from 'vuex';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';

import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('Home', () => {
    const build = () => {
        const options = {
            localVue,
            router,
        };

        const wrapper: Wrapper<Home> = shallowMount(Home, options);
        const mountedWrapper: Wrapper<Home> = mount(Home, options);

        return {
            wrapper,
            productsCard: () => mountedWrapper.findAllComponents(Card).at(0),
            reportsCard: () => mountedWrapper.findAllComponents(Card).at(1),
            goBackButton: () => mountedWrapper.findComponent(Button),
        };
    };

    beforeEach(() => {
        router.push = jest.fn();
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

    it('go to the products page', async () => {
        const { productsCard } = build();

        await productsCard().trigger('click');

        expect(router.push).toHaveBeenCalledWith('/products');
    });

    it('go to the reports page', async () => {
        const { reportsCard } = build();

        await reportsCard().trigger('click');

        expect(router.push).toHaveBeenCalledWith('/reports');
    });

    it('go back to login page', async () => {
        const { goBackButton } = build();

        await goBackButton().find('button').trigger('click');

        expect(router.push).toHaveBeenCalledWith('/login');
    });
});
