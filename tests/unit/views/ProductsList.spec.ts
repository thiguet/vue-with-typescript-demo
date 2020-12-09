import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex, { ModuleTree, Store } from 'vuex';
import VueRouter from 'vue-router';

import ProductsList from '@/views/ProductsList.vue';
import ProductsTable from '@/components/ProductsTable.vue';
import faker from 'faker';
import { ProductsVuex } from '../store/models.d';
import { Measures, VuexAppModules } from '@/store/datatypes/models';
import { State, MutationTypes, ActionTypes } from '@/store/modules/products';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('ProductsList', () => {
    let store: Store<State>;
    let products: ProductsVuex;

    const getRandomMeasure = () =>
        faker.random.arrayElement(Object.values(Measures)) as Measures;

    const build = () => {
        const options = {
            localVue,
            store,
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

        products = {
            namespaced: true,
            state: {
                selectedProduct: {
                    name: faker.random.word(),
                    measure: getRandomMeasure(),
                    qtd: faker.random.number(),
                    minQtd: faker.random.number(),
                    image: faker.image.image(),
                },
                products: Array(50)
                    .fill(null)
                    .map(() => ({
                        name: faker.random.word(),
                        measure: getRandomMeasure(),
                        qtd: faker.random.number(),
                        minQtd: faker.random.number(),
                        image: faker.image.image(),
                    })),
            },
            mutations: {
                [MutationTypes.setProductName]: jest.fn(),
                [MutationTypes.setProductQtd]: jest.fn(),
                [MutationTypes.setProductMinQtd]: jest.fn(),
                [MutationTypes.setProductMeasure]: jest.fn(),
                [MutationTypes.setProductImage]: jest.fn(),
            },
            actions: {
                [ActionTypes.newProduct]: jest.fn(),
            },
        };

        const modules: ModuleTree<State> = {
            [VuexAppModules.products]: {
                ...products,
            },
        };

        store = new Vuex.Store({
            modules,
        });
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
