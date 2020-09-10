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
            imgContainer: () => wrapper.find('.img-container'),
            imgBtn: () => wrapper.find('#img-btn'),
            img: () => wrapper.find('#img'),
            name: () => wrapper.find('#name'),
            measure: () => wrapper.find('#measure'),
            qtd: () => wrapper.find('#qtd'),
            minQtd: () => wrapper.find('#minQtd'),
            submit: () => wrapper.find('#submit'),
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
            products: [],
        };
    });

    it('renders the component', () => {
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();         
    });

    it('renders main components', () => {
        const { 
            wrapper,
            imgBtn,
            name,
            qtd,
            minQtd,
            measure,
            submit,
            imgContainer,
        } = build();
    
        expect(name().exists()).toBe(true);
        expect(qtd().exists()).toBe(true);
        expect(minQtd().exists()).toBe(true);
        expect(measure().exists()).toBe(true);
        expect(submit().exists()).toBe(true);
        expect(imgBtn().exists()).toBe(true);
        expect(imgContainer().exists()).toBe(true);
    });

    it('passes props properly to elements', () => {
        const { wrapper } = build();

        
    });
});
