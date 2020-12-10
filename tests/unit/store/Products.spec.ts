import Vue from 'vue';
import Vuex from 'vuex';

import store from '@/store';

import faker from 'faker';

import { State, MutationTypes, ActionTypes } from '@/store/modules/products';

import { Product, Measures } from '@/store/datatypes/models';

Vue.use(Vuex);

const namespace = 'products/';

describe('Products Vuex Module', () => {
    let state: State;
    let product: Product;

    const lastAddedProduct = (products: Product[]) => ({
        ...products.slice(-1)[0],
    });
    const getRandomMeasure = () => faker.random.arrayElement(Object.values(typeof Measures)) as Measures;

    beforeEach(() => {
        state = store.state.products;
        product = {
            name: faker.name.title(),
            measure: getRandomMeasure(),
            image: faker.image.image(),
            qtd: faker.random.number(),
            minQtd: faker.random.number(),
        };
    });

    it('sets the product to the module state.', () => {
        store.commit(namespace + MutationTypes.setProduct, product);

        expect({ ...state }).toEqual({
            ...state,
            selectedProduct: product,
        });
    });

    it('add a product to the modules state in the end of the array.', () => {
        store.commit(namespace + MutationTypes.addProduct, product);

        const { products } = state;

        expect(lastAddedProduct(products)).toEqual({ ...product });
    });

    it('dispatches new product action: ', async () => {
        const { products } = state;
        const { length } = products;

        await store.dispatch(namespace + ActionTypes.newProduct, product);

        expect(products.length).toBe(length + 1);
        expect(lastAddedProduct(products)).toEqual({ ...product });
    });
});
