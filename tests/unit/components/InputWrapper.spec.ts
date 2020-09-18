import { shallowMount } from '@vue/test-utils';
import TextInput from '@/components/TextInput.vue';
import InputWrapper from '@/components/InputWrapper.vue';
import faker from 'faker';
import { TextInputProps, InputWrapperProps } from './models';

describe('InputWrapper.vue', () => {
    let props: InputWrapperProps;

    const build = () => {
        const textInputWrapper = {
            render(h: Function) {
                const textInputData: TextInputProps = {
                    id: 'someid',
                    value: 'somevalue',
                    setValue: jest.fn(),
                };

                return h(TextInput, {
                    props: textInputData,
                });
            },
        };

        const wrapper = shallowMount(InputWrapper, {
            propsData: { ...props },
            slots: { default: textInputWrapper },
        });

        return {
            wrapper,
            input: () => wrapper.findComponent(TextInput),
            labelEl: () => wrapper.find('.label'),
            legend: () => wrapper.find('legend'),
        };
    };

    beforeEach(() => {
        props = {
            label: faker.random.words(),
            legend: faker.random.words(),
        };
    });

    it('renders component', () => {
        props.label = 'someFixedValidLabel';
        props.legend = 'someFixedValidLegend';

        const { wrapper } = build();

        expect(wrapper).toMatchSnapshot();
    });

    it('renders main child components', () => {
        const { labelEl, legend } = build();

        expect(legend().exists()).toBe(true);
        expect(labelEl().exists()).toBe(true);
    });

    it('passes props to the component', () => {
        const { wrapper } = build();

        const { label, legend } = wrapper.props();

        expect(label).toBe(props.label);
        expect(legend).toBe(props.legend);
    });

    it('sets propeties to label element', () => {
        const { wrapper, labelEl } = build();

        expect(labelEl().text()).toBe(wrapper.props().label + ':');
    });

    it('sets legends text', () => {
        const { wrapper, legend } = build();

        expect(legend().text()).toBe(wrapper.props().legend);
    });
});
