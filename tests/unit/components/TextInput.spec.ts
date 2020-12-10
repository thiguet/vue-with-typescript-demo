import { shallowMount } from '@vue/test-utils';
import TextInput from '@/components/TextInput.vue';
import faker from 'faker';
import { TextInputProps } from './models';

describe('TextInput.vue', () => {
    let props: TextInputProps;

    const build = () => {
        const wrapper = shallowMount(TextInput, {
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
            type: 'text',
            value: faker.random.word(),
            setValue: jest.fn(),
        };
    });

    it('renders component', () => {
        props.id = 'someFixedValidId';
        props.value = 'someFixedValidValue';

        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders main child components', () => {
        const { input } = build();

        expect(input().exists()).toBe(true);
    });

    it('passes props to the component', () => {
        const { wrapper } = build();

        const { id, type, value, setValue } = wrapper.props();

        expect(id).toBe(props.id);
        expect(type).toBe(props.type);
        expect(value).toBe(props.value);
        expect(setValue).toBe(props.setValue);
    });

    it("sets input's type propety to element by props", () => {
        const { wrapper, input } = build();

        const { type } = wrapper.props();

        expect(input().attributes().type).toBe(type);
    });

    it('sets type to text using default value', () => {
        delete props.type;

        const { wrapper } = build();

        expect(wrapper.props().type).toBe('text');
    });

    it("sets input's input propety to setValue fn", async () => {
        const { wrapper, inputEl, input } = build();

        const { setValue } = wrapper.props();

        const value = faker.random.word();

        inputEl().value = value;

        await input().trigger('input');

        expect(setValue).toHaveBeenCalledWith(value);
    });
});
