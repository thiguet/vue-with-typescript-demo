import { shallowMount } from '@vue/test-utils';
import Input from '@/components/Input.vue';
import faker from 'faker';

interface InputData {
  id: string;
  label: string;
  value: string;
  setValue: Function;
  legend?: string;
  type?: "text" | "number" | "password" | undefined;
};

describe('Input.vue', () => {
  let props: InputData;
  
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

  beforeEach(() => {
    props = {
      id: faker.random.alphaNumeric(),
      type: 'text',
      value: faker.random.word(),
      setValue: jest.fn(),
      label: faker.random.word(),
      legend: "This is an Input",
    };
  });

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

  it('sets type to text using default value', () => {
    delete props.type;

    const { wrapper } = build();

    expect(wrapper.props().type).toBe("text");
  });

  it('has legend element', () => {
    const {
      wrapper,
      legend,
    } = build();

    expect(legend().text()).toBe(wrapper.props().legend);
  });

  it('must have label for input element', () => {
    const {
      wrapper,
      labelEl,
      input,
    } = build();

    expect(labelEl().attributes().for).toBe(props.id);
    expect(labelEl().attributes().for).toBe(input().attributes().name);
  });
});
