import Vue from 'vue';

import Vuex from 'vuex';

import faker from 'faker';

import {
    ProductsState,
    Mutations,
    MutationTypes,
    Actions,
} from '@/store/modules/products';

import { Product, Measures } from '@/store/datatypes/models';
import { inject } from 'vuex-smart-module';

Vue.use(Vuex);

describe('Products Vuex Module', () => {
    let state: ProductsState;

    const lastAddedProduct = (products: Product[]) => ({
        ...products.slice(-1)[0],
    });

    const getRandomMeasure = () =>
        faker.random.arrayElement(
            Object.values(typeof Measures)
        ) as keyof typeof Measures;

    const getNewProduct = (): Product => ({
        name: faker.name.title(),
        measure: getRandomMeasure(),
        img: faker.image.image(),
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

        return {
            commit,
            mutations,
        };
    };

    it('sets the product to the module state.', () => {
        const { mutations } = build();

        const newProduct = getNewProduct();

        mutations.setProduct(newProduct);

        expect({ ...state }).toEqual({
            ...state,
            selectedProduct: newProduct,
        });
    });

    it('add a product to the modules state in the end of the array.', () => {
        const { mutations } = build();

        const newProduct = getNewProduct();

        const { products } = state;

        mutations.addProduct(newProduct);

        expect(lastAddedProduct(products)).toEqual({ ...newProduct });
    });

    it('dispatches new product action: ', async () => {
        const newProduct = getNewProduct();

        const { commit } = build();

        const actions = inject(Actions, {
            commit,
        });

        await actions.newProduct(newProduct);

        expect(commit).toHaveBeenCalledWith(
            MutationTypes.addProduct,
            newProduct
        );
    });
});
