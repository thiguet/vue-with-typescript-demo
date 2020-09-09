import { shallowMount } from '@vue/test-utils';
import Input from '@/components/Input.vue';
import faker from 'faker';

interface InputData {
  id: string;
  label: string;
  type: "text" | "number" | undefined;
  value: string;
  setValue: Function;
  legend?: string;
};

const props: InputData = {
  id: faker.random.alphaNumeric(),
  type: 'text',
  value: faker.random.word(),
  setValue: jest.fn(),
  label: faker.random.word(),
  legend: "This is an Input",
};

describe('Input.vue', () => {
  const build = () => {
    const wrapper = shallowMount(Input, {
      propsData: { ...props },
    });

    return {
      wrapper,
      input: () => wrapper.find('.input'),
      labelEl: () => wrapper.find('.label'),
      legend: () => wrapper.find('legend'),
    };
  };

  it('renders component', () => {
    props.id = 'someFixedValidId';
    props.value = 'someFixedValidValue';
    props.label = 'someFixedValidLabel';

    const { wrapper } = build();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders main child components', () => {
    const {
      input,
      labelEl,
    } = build();

    expect(input().exists()).toBe(true);
    expect(labelEl().exists()).toBe(true);
  });

  it('passes props to the component', () => {
    const { wrapper } = build();

    const {
      type,
      value,
      label,
      id,
      setValue,
      legend,
    } = wrapper.props();

    expect(id).toBe(props.id);
    expect(type).toBe(props.type);
    expect(value).toBe(props.value);
    expect(label).toBe(props.label);
    expect(setValue).toBe(props.setValue);
    expect(legend).toBe(props.legend);
  });

  it('sets label propety to label element', () => {
    const {
      wrapper,
      labelEl,
    } = build();

    const { label } = wrapper.props();

    expect(labelEl().text()).toBe(label);
  });

  it('sets input\'s type propety to element by props', () => {
    const {
      wrapper,
      input,
    } = build();

    const { type } = wrapper.props();

    expect(input().attributes().type).toBe(type);
  });

  it('has legend element', () => {
    const {
      wrapper,
      legend,
    } = build();

    expect(legend().text()).toBe(wrapper.props().legend);
  });
});
