import Vuex, { ModuleTree, Store } from 'vuex';
import { shallowMount, createLocalVue, Wrapper, mount } from '@vue/test-utils';
import faker from 'faker';
import AddProduct from '@/views/AddProduct.vue';
import Button from '@/components/Button.vue';
import { Measures, VuexAppModules } from '@/store/datatypes/models';
import {
    State as ProductsState,
    MutationTypes,
    ActionTypes,
} from '@/store/modules/products';
import {
    State as AlertState,
    ActionTypes as AlertActionsTypes,
} from '@/store/modules/alert';
import Vue from 'vue';
import { newProductSuccess, newProductError } from '@/assets/messages';
import { ProductsVuex, AlertVuex } from '../store/models.d';
import VueRouter from 'vue-router';

jest.setTimeout(30000);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe('AddProduct.vue', () => {
    let products: ProductsVuex;
    let alert: AlertVuex;

    let store: Store<AlertState & ProductsState>;

    const getInputEl = (wrapperFn: Wrapper<Vue>) =>
        wrapperFn.element as HTMLInputElement;

    const build = () => {
        const options = {
            localVue,
            store,
            router,
        };

        const wrapper = shallowMount(AddProduct, options);
        const mountedWrapper = mount(AddProduct, options);

        return {
            wrapper,
            mountedWrapper,
            img: () => mountedWrapper.find('#img'),
            imgBtn: () => mountedWrapper.find('#img-btn'),
            name: () => mountedWrapper.find('#name'),
            measure: () => mountedWrapper.find('#measure'),
            qtd: () => mountedWrapper.find('#qtd'),
            minQtd: () => mountedWrapper.find('#min-qtd'),
            submit: () => mountedWrapper.find('#add-product'),
            goBackButton: () => mountedWrapper.find('#go-back'),
        };
    };

    const getRandomMeasure = () =>
        faker.random.arrayElement(Object.values(Measures)) as Measures;

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
                products: [],
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

        alert = {
            namespaced: true,
            state: {
                message: faker.lorem.text(),
                display: false,
            },
            mutations: {},
            actions: {
                [AlertActionsTypes.openAlert]: jest.fn(),
                [AlertActionsTypes.closeAlert]: jest.fn(),
            },
        };
        const modules: ModuleTree<AlertState & ProductsState> = {
            [VuexAppModules.alert]: {
                namespaced: true,
                ...alert,
            },
            [VuexAppModules.products]: {
                ...products,
            },
        };

        store = new Vuex.Store({
            modules,
        });
    });

    it('renders the component', () => {
        const { state } = products;

        state.selectedProduct.name = 'someFixedName';
        state.selectedProduct.qtd = 0;
        state.selectedProduct.minQtd = 0;
        state.selectedProduct.measure = Measures.KG;
        state.selectedProduct.image = 'someFixedImage';

        const { wrapper } = build();

        expect(wrapper).toMatchSnapshot();
    });

    it('renders main components', () => {
        const { img, imgBtn, name, qtd, minQtd, measure, submit } = build();

        expect(name().exists()).toBe(true);
        expect(qtd().exists()).toBe(true);
        expect(minQtd().exists()).toBe(true);
        expect(measure().exists()).toBe(true);

        expect(submit().exists()).toBe(true);

        expect(img().exists()).toBe(true);
        expect(imgBtn().exists()).toBe(true);
    });

    it('calls vuex mutations on input', async done => {
        const {
            setProductName,
            setProductQtd,
            setProductMinQtd,
        } = products.mutations;
        const { name, qtd, minQtd, measure } = build();

        const nameVal = `${faker.random.word()}`;
        const qtdVal = `${faker.random.number()}`;
        const minQtdVal = `${faker.random.number()}`;
        getInputEl(name()).value = nameVal;
        await name().trigger('input');

        getInputEl(qtd()).value = qtdVal;
        await qtd().trigger('input');

        getInputEl(minQtd()).value = minQtdVal;
        await minQtd().trigger('input');

        expect(setProductName).toBeCalled();
        expect(setProductQtd).toBeCalled();
        expect(setProductMinQtd).toBeCalled();

        expect(
            (setProductName as jest.Mock<typeof setProductName>).mock
                .calls[0][1],
        ).toBe(nameVal);
        expect(
            (setProductQtd as jest.Mock<typeof setProductQtd>).mock.calls[0][1],
        ).toBe(qtdVal);
        expect(
            (setProductMinQtd as jest.Mock<typeof setProductMinQtd>).mock
                .calls[0][1],
        ).toBe(minQtdVal);
        done();
    });

    it('adds a product when button triggers', async () => {
        const alertActions = alert.actions;

        const { submit } = build();

        await submit().trigger('click');
        expect(products.actions.newProduct).toBeCalled();
        expect(
            (alertActions.openAlert as jest.Mock<typeof alertActions.openAlert>)
                .mock.calls[0][1],
        ).toBe(newProductSuccess);
    });

    it('fails to add a product when button triggers', async () => {
        const alertActions = alert.actions;
        (products.actions.newProduct as jest.Mock<
            typeof products.actions.newProduct
        >).mockImplementation(() => {
            throw new Error();
        });
        const { submit } = build();

        const openAlert = alertActions.openAlert as jest.Mock<
            typeof alertActions.openAlert
        >;

        await submit().trigger('click');

        expect(openAlert).toBeCalled();
        expect(openAlert.mock.calls[0][1]).toBe(newProductError);
    });

    it('go back to home page', async () => {
        const { goBackButton } = build();

        await goBackButton().trigger('click');

        expect(router.push).toHaveBeenCalledWith('/products');
    });
});
