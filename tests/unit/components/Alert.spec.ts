import { shallowMount } from '@vue/test-utils';
import Alert from '@/components/Alert.vue';
import faker from 'faker';

describe('Alert', () => {
  const props: any = {
    isVisible: true,
    closeFn: jest.fn(),
    message: faker.lorem.paragraph(),
  };

  const build = () => {
    const wrapper = shallowMount(Alert, {
      propsData: { ...props },
    });

    return {
      wrapper,
      message: () => wrapper.find('.message'),
      closeBtn: () => wrapper.find('.close-btn'),
    };
  };

  it('renders component', () => {
    props.message = 'Some default text';
    const { wrapper } = build();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders main components', () => {
    const {
      closeBtn,
      message,
    } = build();

    expect(closeBtn().exists()).toBe(true);
    expect(message().exists()).toBe(true);
  });

  it('message text must be the same as props', () => {
    const {
      closeBtn,
      message,
    } = build();

    expect(closeBtn().exists()).toBe(true);
    expect(message().exists()).toBe(true);
  });

  it('calls close fn on click', async () => {
    const { closeBtn } = build();
    const { closeFn } = props;

    await closeBtn().trigger('click');

    expect(closeFn).toHaveBeenCalled();
  });

  it('hides component on isVisible false', () => {
    props.isVisible = false;
    const {
      wrapper,
      message,
    } = build();
    expect(wrapper.props().isVisible).toBe(false);
    expect(message()).toBeTruthy();
  });

  it('receives required props', () => {
    const { wrapper } = build();

    const {
      closeFn,
      message,
      isVisible,
    } = wrapper.props();

    expect(isVisible).toBe(props.isVisible);
    expect(closeFn).toBe(props.closeFn);
    expect(message).toBe(props.message);
  });
});
