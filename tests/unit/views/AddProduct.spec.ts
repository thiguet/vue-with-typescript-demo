import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import AddProduct from '@/views/AddProduct.vue';
import Vuex from 'vuex';
import faker from 'faker';
import Store from '@/store';
import { Measures } from '@/store/datatypes/models';
import { ProductsState } from '@/store/modules/products';
import {
    ButtonProps,
    NumberInputProps,
    TextInputProps,
} from '../components/models';
import { keys } from 'ts-transformer-keys';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AddProduct.vue', () => {
    let store: typeof Store;
    let state: ProductsState;

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
            submit: () => wrapper.find('#add-product'),
        };
    };

    const getRandomMeasure = () =>
        faker.random.arrayElement(Object.values(Measures)) as Measures;

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

    it('check types for inputs', () => {
        const { name, qtd, minQtd, submit, imgBtn } = build();

        // const TextKeys = keys<TextInputProps>();
        // const NumberKeys = keys<NumberInputProps>();
        // const ButtonKeys = keys<ButtonProps>();

        // const getPropsKeys = (comp: Wrapper<Vue>) => Object.keys(comp.props());

        // expect(getPropsKeys(name())).toBe(TextKeys);
        // expect(getPropsKeys(qtd())).toBe(NumberKeys);
        // expect(getPropsKeys(minQtd())).toBe(NumberKeys);
        // expect(getPropsKeys(imgBtn())).toBe(ButtonKeys);
        // expect(getPropsKeys(submit())).toBe(ButtonKeys);
    });
});
