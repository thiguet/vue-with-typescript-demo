import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

const props: any = {
    label: 'label',
    onclick: jest.fn(),
};

describe('Button', () => {
    const build = () => {
        const wrapper = shallowMount(Button, {
            propsData: { ...props },
        });

        return {
            wrapper,
            btnWrapper: () => wrapper.find('.wrapper-btn'),
            button: () => wrapper.find('.btn'),
        };
    };

    it('renders component', () => {
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });
    
    it('renders main child components', () => {
        const {
            btnWrapper,
            button,
        } = build();

        expect(btnWrapper().exists()).toBe(true);
        expect(button().exists()).toBe(true);
    });

    it('clicks method', async () => {
        const { button } = build();

        await button().trigger('click');

        expect(props.onclick).toHaveBeenCalled();
    });
});
