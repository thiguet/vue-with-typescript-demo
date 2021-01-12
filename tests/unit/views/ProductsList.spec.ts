import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex, { ModuleTree, Store } from 'vuex';
import VueRouter from 'vue-router';

import ProductsList from '@/views/ProductsList.vue';
import ProductsTable from '@/components/ProductsTable.vue';
import faker from 'faker';
import { VuexAppModules } from '@/store/datatypes/models';
import {
    State,
    MutationTypes,
    ActionTypes,
    GettersTypes,
} from '@/store/modules/products';
import { getAllProducts } from '@/services/Products';
import { ProductsVuex } from '../store/models.d';
import { getFakeProduct, getFakeProductArray } from '../utils/ProductFactory';

jest.mock('@/services/Products');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('ProductsList', () => {
    let store: Store<State>;

    let products: ProductsVuex;

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
                editMode: false,
                selectedProduct: {
                    ...getFakeProduct(),
                },
                products: getFakeProductArray(),
            },
            getters: {
                [GettersTypes.tableRows]: jest.fn(),
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
                [ActionTypes.editProduct]: jest.fn(),
                [ActionTypes.saveProduct]: jest.fn(),
                [ActionTypes.fetchProducts]: jest.fn(),
                [ActionTypes.selectProduct]: jest.fn(),
                [ActionTypes.deleteProduct]: jest.fn(),
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

    it('fetch products on mount', async () => {
        build();

        await setTimeout(() => {
            expect(getAllProducts).toHaveBeenCalled();
        }, 1000);
    });

    it('go back to home page', async () => {
        const { goBackButton } = build();

        await goBackButton().trigger('click');

        expect(router.push).toHaveBeenCalledWith('/');
    });

    it('go back to new product page', async () => {
        const { actions } = products;

        const { addProductButton } = build();

        await addProductButton().trigger('click');

        expect(actions.newProduct).toBeCalled();

        expect(router.push).toHaveBeenCalledWith('/products/new');
    });

    it('sends the user to the edit page selecting the product', async () => {
        const { actions } = products;

        const { productsList } = build();

        const index = faker.random.number({ min: 0, max: 5 });

        await productsList().vm.$emit('on-edit', index);

        expect(router.push).toHaveBeenCalledWith('/products/edit');

        expect(actions.editProduct).toBeCalled();

        expect(actions.selectProduct).toBeCalled();
    });

    it('calls deleteProduct action', async () => {
        const { actions } = products;

        const { productsList } = build();

        const index = faker.random.number({ min: 0, max: 5 });

        await productsList().vm.$emit('on-delete', index);

        expect(actions.deleteProduct).toBeCalled();
    });
});
