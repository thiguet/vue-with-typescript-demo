import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store';
import faker from 'faker';
import { ProductsState } from '@/store/modules/products';
import { Product, Measures } from '@/store/datatypes/models.d';

Vue.use(Vuex);

const namespace = 'products/';

describe('Products Vuex Module', () => {
  let state: ProductsState,
      product: Product;

  const getRandomMeasure = () => faker.random.arrayElement(Object.values(typeof Measures)) as keyof typeof Measures;

  beforeEach(() => {
    state = store.state.products;
    product = {
        name: faker.name.title(),
        measure: getRandomMeasure(),
        img: faker.image.image(),
        qtd: faker.random.number(),
        minQtd: faker.random.number(),
    };
  });

  it('sets the product to the module state.', () => {
    store.commit(namespace + 'setProduct', product);

    expect({...state}).toEqual({
      ...state,
      selectedProduct: product,
    });
  });
});
