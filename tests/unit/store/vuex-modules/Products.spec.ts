import Vue from 'vue';

import Vuex from 'vuex';

import faker from 'faker';

import {
    State,
    Mutations,
    MutationTypes,
    Actions,
    Getters,
    GettersTypes,
} from '@/store/modules/products';

import { Product, Measures } from '@/store/datatypes/models';
import { inject } from 'vuex-smart-module';

Vue.use(Vuex);

describe('Products Vuex Module', () => {
    let state: State;

    const lastAddedProduct = (products: Product[]) => ({
        ...products.slice(-1)[0],
    });

    const getRandomMeasure = () =>
        faker.random.arrayElement(Object.values(typeof Measures)) as Measures;

    const getNewProduct = (): Product => ({
        name: faker.name.title(),
        measure: getRandomMeasure(),
        image: faker.image.image(),
        qtd: faker.random.number(),
        minQtd: faker.random.number(),
    });

    const build = () => {
        state = {
            selectedProduct: getNewProduct(),
            products: [],
        };

        const commit = jest.fn();

        const mutations = inject(Mutations, {
            state,
        });

        const getters = inject(Getters, {
            state,
        });

        return {
            commit,
            getters,
            mutations,
        };
    };

    it('gets tableRows from state.products .', () => {
        state = {
            products: Array(20)
                .fill(null)
                .map(() => ({
                    ...getNewProduct(),
                })),
            selectedProduct: getNewProduct(),
        };

        const getters = inject(Getters, {
            state,
        });

        const data = state.products.map(p => ({
            icon: p.image,
            name: p.name,
        }));

        console.log(getters[GettersTypes.tableRows]);

        expect(getters[GettersTypes.tableRows]).toEqual(data);
    });

    it('sets the product to the module state.', () => {
        const { mutations } = build();

        const newProduct = getNewProduct();

        mutations.setProduct(newProduct);

        expect({ ...state }).toEqual({
            ...state,
            selectedProduct: newProduct,
        });
    });

    it('sets the product name to the state.', () => {
        const { mutations } = build();

        const { name } = getNewProduct();

        mutations.setProductName(name);

        expect({ ...state }).toEqual({
            ...state,
            selectedProduct: {
                ...state.selectedProduct,
                name,
            },
        });
    });

    it('sets the product quantity to the state.', async () => {
        const { mutations } = build();

        const { qtd } = getNewProduct();

        await mutations.setProductQtd(qtd);

        expect({ ...state }).toEqual({
            ...state,
            selectedProduct: {
                ...state.selectedProduct,
                qtd,
            },
        });
    });

    it('sets the product quantity to zero when negative.', () => {
        const { mutations } = build();

        const qtd = -1;

        mutations.setProductQtd(qtd);

        expect({ ...state }).toEqual({
            ...state,
            selectedProduct: {
                ...state.selectedProduct,
                qtd: 0,
            },
        });
    });

    it('sets the product minimum quantity to the state.', () => {
        const { mutations } = build();

        const { minQtd } = getNewProduct();

        mutations.setProductMinQtd(minQtd);

        expect({ ...state }).toEqual({
            ...state,
            selectedProduct: {
                ...state.selectedProduct,
                minQtd,
            },
        });
    });

    it('sets the product minimum quantity to zero when negative.', () => {
        const { mutations } = build();

        const minQtd = -1;

        mutations.setProductMinQtd(minQtd);

        expect({ ...state }).toEqual({
            ...state,
            selectedProduct: {
                ...state.selectedProduct,
                minQtd: 0,
            },
        });
    });

    it('sets the product measure to the state.', () => {
        const { mutations } = build();

        const { measure } = getNewProduct();

        mutations.setProductMeasure(measure);

        expect({ ...state }).toEqual({
            ...state,
            selectedProduct: {
                ...state.selectedProduct,
                measure,
            },
        });
    });

    it('sets the product image to the state.', () => {
        const { mutations } = build();

        const { image } = getNewProduct();

        mutations.setProductImage(image as string);

        expect({ ...state }).toEqual({
            ...state,
            selectedProduct: {
                ...state.selectedProduct,
                image,
            },
        });
    });

    it('add a product to the modules state in the end of the array.', () => {
        const { mutations } = build();

        const newProduct = getNewProduct();

        const { products } = state;

        mutations.addProduct(newProduct);

        expect(lastAddedProduct(products)).toEqual({ ...newProduct });
    });

    it('sets a product to state.selectedProduct.', () => {
        const { mutations } = build();

        const newProduct = getNewProduct();

        const { products } = state;

        mutations.addProduct(newProduct);

        mutations.selectProduct(0);

        expect({ ...products[0] }).toEqual({ ...newProduct });
    });

    it('dispatches new product action: ', async () => {
        const newProduct = getNewProduct();

        const { commit } = build();

        const actions = inject(Actions, {
            commit,
        });

        await actions.saveProduct(newProduct);

        expect(commit).toHaveBeenCalledWith(
            MutationTypes.addProduct,
            newProduct,
        );
    });

    it('dispatches select product action: ', async () => {
        const index = 0;

        const { commit } = build();

        const actions = inject(Actions, {
            commit,
        });

        await actions.selectProduct(index);

        expect(commit).toHaveBeenLastCalledWith(
            MutationTypes.selectProduct,
            index,
        );
    });

    it('dispatches delete product action: ', async () => {
        const index = 0;

        const { commit } = build();

        const { products } = state;

        const newProduct = getNewProduct();

        const actions = inject(Actions, {
            commit,
        });

        await actions.saveProduct(newProduct);

        await actions.deleteProduct(index);

        expect(products.length).toEqual(0);

        expect(commit).toHaveBeenLastCalledWith(
            MutationTypes.deleteProduct,
            index,
        );
    });
});
