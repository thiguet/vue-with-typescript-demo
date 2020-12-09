import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex from 'vuex';
import VueRouter from 'vue-router';

import ProductsList from '@/views/ProductsList.vue';
import ProductsTable from '@/components/ProductsTable.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('ProductsList', () => {
    const build = () => {
        const options = {
            localVue,
            router,
        };

        const wrapper: Wrapper<ProductsList> = shallowMount(
            ProductsList,
            options,
        );
        const mountedWrapper: Wrapper<ProductsList> = mount(
            ProductsList,
            options,
        );

        return {
            wrapper,
            productsList: () => mountedWrapper.findComponent(ProductsTable),
            goBackButton: () => mountedWrapper.find('#go-back'),
            addProductButton: () => mountedWrapper.find('#add-product'),
        };
    };

    beforeEach(() => {
        router.push = jest.fn();
    });

    it('renders component', () => {
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders main components', () => {
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('go back to home page', async () => {
        const { goBackButton } = build();

        await goBackButton().trigger('click');

        expect(router.push).toHaveBeenCalledWith('/');
    });

    it('go back to new product page', async () => {
        const { addProductButton } = build();

        await addProductButton().trigger('click');

        expect(router.push).toHaveBeenCalledWith('/products/new');
    });

    it('sends the user to the edit page with props', async () => {
        const { productsList } = build();

        await productsList().vm.$emit('on-edit');

        expect(router.push).toHaveBeenCalledWith('/products/edit');
    });
});
