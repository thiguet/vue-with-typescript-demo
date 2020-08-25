import { shallowMount } from '@vue/test-utils';
import Input from '@/components/Input.vue';

interface InputData {
  id: string,
  label: string,
  type: string,
  value: string,
  setValue: Function,
};

const props: InputData = {
  id: 'id',
  type: 'text',
  value: 'some value',
  setValue: jest.fn(),
  label: 'some label',
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
    };
  };

  it('renders component', () => {
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
    } = wrapper.props();

    expect(id).toBe(props.id);
    expect(type).toBe(props.type);
    expect(value).toBe(props.value);
    expect(label).toBe(props.label);
    expect(setValue).toBe(props.setValue);
  });

  it('sets label propety to label element', () => {
    const {
      wrapper,
      labelEl,
    } = build();

    const { label } = wrapper.props();

    expect(labelEl().text()).toBe(label);
  });
});
