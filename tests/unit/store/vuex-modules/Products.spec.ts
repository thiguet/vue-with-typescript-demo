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
import {
    newProduct,
    editProduct,
    deleteProduct,
    getAllProducts,
} from '@/services/Products';
import {
    getFakeProduct,
    getFakeProductArray,
} from '../../utils/ProductFactory';

jest.mock('@/services/Products');

Vue.use(Vuex);

describe('Products Vuex Module', () => {
    let state: State;
    let product: Product;

    const lastAddedProduct = (products: Product[]) => ({
        ...products.slice(-1)[0],
    });

    const build = () => {
        state = {
            editMode: false,
            selectedProduct: getFakeProduct(),
            products: [],
        };
        product = getFakeProduct();

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
                editMode: faker.random.boolean(),
                products: getFakeProductArray(),
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
        it('sets products to the state', () => {
            const { mutations } = build();

            const products = getFakeProductArray();

            mutations.setProducts(products);

            expect({ ...state }).toEqual({
                ...state,
                products,
            });
        });

        it('sets the product to the module state.', () => {
            const { mutations } = build();

            mutations.setProduct(product);

            expect({ ...state }).toEqual({
                ...state,
                selectedProduct: product,
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

            const { products } = state;

            mutations.addProduct(product);

            expect(lastAddedProduct(products)).toEqual({ ...product });
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

            const { products } = state;

            mutations.addProduct(product);

            mutations.selectProduct(0);

            expect({ ...products[0] }).toEqual({ ...product });
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

        it('sets the edit mode on', async () => {
            state.editMode = false;

            const { mutations } = build();

            mutations.changeEditMode(true);

            expect(state.editMode).toBe(true);
        });
    });

    describe('actions', () => {
        it('dispatches get all products action: ', async () => {
            const { commit } = build();

            const actions = inject(Actions, {
                state,
                commit,
            });

            await actions.fetchProducts();

            expect(commit).toHaveBeenCalledWith(MutationTypes.setProducts, []);

            expect(getAllProducts).toHaveBeenCalled();
        });
        it('dispatches save new product action: ', async () => {
            const fakeProduct = getFakeProduct();

            const { commit } = build();

            const actions = inject(Actions, {
                state,
                commit,
            });

            state.editMode = false;

            await actions.saveProduct(fakeProduct);

            expect(commit).toHaveBeenCalledWith(
                MutationTypes.addProduct,
                fakeProduct,
            );

            expect(newProduct).toHaveBeenCalledWith(fakeProduct);
        });
        it('dispatches save editing product action: ', async () => {
            const fakeProduct = getFakeProduct();

            const { commit } = build();

            const actions = inject(Actions, {
                state,
                commit,
            });

            state.editMode = true;

            await actions.saveProduct(fakeProduct);

            expect(commit).toHaveBeenCalledWith(
                MutationTypes.addProduct,
                fakeProduct,
            );

            expect(editProduct).toHaveBeenCalledWith(fakeProduct);
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

        it('dispatches new product action: ', async () => {
            const { commit } = build();

            const actions = inject(Actions, {
                state,
                commit,
            });

            await actions.newProduct();

            expect(commit).toHaveBeenLastCalledWith(
                MutationTypes.changeEditMode,
                false,
            );
        });

        it('dispatches edit product action: ', async () => {
            const { commit } = build();

            const actions = inject(Actions, {
                state,
                commit,
            });

            await actions.editProduct();

            expect(commit).toHaveBeenCalledWith(
                MutationTypes.changeEditMode,
                true,
            );
        });

        it('dispatches delete product action: ', async () => {
            const index = 0;

            const { commit } = build();

            const actions = inject(Actions, {
                state,
                commit,
            });

            await actions.deleteProduct(index);

            expect(commit).toHaveBeenLastCalledWith(
                MutationTypes.deleteProduct,
                index,
            );

            expect(deleteProduct).toHaveBeenCalledWith(state.products[index]);
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
