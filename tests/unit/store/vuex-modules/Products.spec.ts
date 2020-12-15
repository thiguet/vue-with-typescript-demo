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

import { Product } from '@/store/datatypes/models';
import { inject } from 'vuex-smart-module';
import { getFakeProduct } from '../../utils/ProductFactory';

Vue.use(Vuex);

describe('Products Vuex Module', () => {
    let state: State;

    const lastAddedProduct = (products: Product[]) => ({
        ...products.slice(-1)[0],
    });

    const build = () => {
        state = {
            selectedProduct: getFakeProduct(),
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

    describe('getters', () => {
        it('gets tableRows from state.products .', () => {
            state = {
                products: Array(20)
                    .fill(null)
                    .map(getFakeProduct),
                selectedProduct: getFakeProduct(),
            };

            const getters = inject(Getters, {
                state,
            });

            const data = state.products.map((p) => ({
                icon: p.image,
                name: p.name,
            }));

            expect(getters[GettersTypes.tableRows]).toEqual(data);
        });
    });

    describe('mutations', () => {
        it('sets the product to the module state.', () => {
            const { mutations } = build();

            const newProduct = getFakeProduct();

            mutations.setProduct(newProduct);

            expect({ ...state }).toEqual({
                ...state,
                selectedProduct: newProduct,
            });
        });

        it('sets the product name to the state.', () => {
            const { mutations } = build();

            const { name } = getFakeProduct();

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

            const { qtd } = getFakeProduct();

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

            const { minQtd } = getFakeProduct();

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

            const { measure } = getFakeProduct();

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

            const { image } = getFakeProduct();

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

            const newProduct = getFakeProduct();

            const { products } = state;

            mutations.addProduct(newProduct);

            expect(lastAddedProduct(products)).toEqual({ ...newProduct });
        });

        it('reset state to the initial state.', () => {
            const { mutations } = build();

            mutations.resetSelectedProduct();

            expect(state.selectedProduct).toEqual({
                ...new State().selectedProduct,
            });
        });

        it('sets a product to state.selectedProduct.', () => {
            const { mutations } = build();

            const newProduct = getFakeProduct();

            const { products } = state;

            mutations.addProduct(newProduct);

            mutations.selectProduct(0);

            expect({ ...products[0] }).toEqual({ ...newProduct });
        });

        it('deletes a product from the state', async () => {
            const index = faker.random.number({
                min: 0,
                max: state.products.length - 1,
            });

            const { mutations } = build();

            state.products.splice = jest.fn();

            mutations.deleteProduct(index);

            expect(state.products.splice).toHaveBeenCalledWith(index, 1);
        });
    });
    describe('actions', () => {
        it('dispatches new product action: ', async () => {
            const newProduct = getFakeProduct();

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

            const actions = inject(Actions, {
                commit,
            });

            await actions.deleteProduct(index);

            expect(commit).toHaveBeenLastCalledWith(
                MutationTypes.deleteProduct,
                index,
            );
        });

        it('dispatches resetSelectedProduct product action: ', async () => {
            const { commit } = build();

            const actions = inject(Actions, {
                commit,
            });

            await actions.resetSelectedProduct();

            expect(commit).toHaveBeenCalled();
        });
    });
});
