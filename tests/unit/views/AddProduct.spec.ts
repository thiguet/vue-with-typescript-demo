import { shallowMount, createLocalVue, } from "@vue/test-utils";
import AddProduct from '@/views/AddProduct.vue';
import Vuex from 'vuex';
import faker from 'faker';
import Store from '@/store';
import { ProductsState } from '@/store/modules/products';
import { Measures } from '@/store/datatypes/models.d';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AddProduct.vue', () => {
    let store: typeof Store, 
        state: ProductsState;
    
    const build = () => {
        const wrapper = shallowMount(AddProduct, {
            localVue,
            store,
        });
        
        return {
            wrapper,
        };
    };

    const getRandomMeasure = () => faker.random.arrayElement(Object.values(typeof Measures)) as keyof typeof Measures;
 
    beforeEach(() => {
        state = {
            selectedProduct: {
                name: faker.random.word(),
                measure: getRandomMeasure(),
                qtd: faker.random.number(),
                minQtd: faker.random.number(),
            },
        };
    });

    it('renders the component', () => {
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();         
    });

    it('passes vuex bindings properly', () => {
        const { wrapper } = build();
    });
});
