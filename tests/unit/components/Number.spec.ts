import { shallowMount } from '@vue/test-utils';
import Number from '@/components/Number.vue';
import faker from 'faker';
import { NumberInputProps } from './models';

describe('Number.vue', () => {
    let props: NumberInputProps;

    const build = () => {
        const wrapper = shallowMount(Number, {
            propsData: { ...props },
        });

        const input = () => wrapper.find('.input');

        return {
            wrapper,
            input,
            inputEl: (): HTMLInputElement => input().element as HTMLInputElement,
        };
    };

    beforeEach(() => {
        props = {
            id: faker.random.alphaNumeric(),
            value: faker.random.word(),
            min: faker.random.number(),
            max: faker.random.number(),
            setValue: jest.fn(),
        };
    });

    it('renders component', () => {
        props.id = 'someFixedValidId';
        props.value = 'someFixedValidValue';
        props.min = 0;
        props.max = 100;

        const { wrapper } = build();

        expect(wrapper).toMatchSnapshot();
    });

    it('renders main child components', () => {
        const { input } = build();

        expect(input().exists()).toBe(true);
    });

    it('passes props to the component', () => {
        const { wrapper } = build();

        const { id, setValue, value, min, max } = wrapper.props();

        expect(id).toBe(props.id);
        expect(value).toBe(props.value);
        expect(setValue).toBe(props.setValue);
        expect(min).toBe(props.min);
        expect(max).toBe(props.max);
    });

    it("sets input's type property to element by props", () => {
        const { input } = build();

        expect(input().attributes().type).toBe('number');
    });

    it("sets input's input propety to setValue fn", async () => {
        const { wrapper, inputEl, input } = build();

        const { setValue } = wrapper.props();

        const value = `${faker.random.number()}`;

        inputEl().value = value;

        await input().trigger('input', { data: value } as InputEventInit);

        expect(setValue).toHaveBeenCalledWith(value);
    });
});
