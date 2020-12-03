import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';
import faker from 'faker';
import { ButtonProps } from './models';

describe('Button', () => {
    let props: ButtonProps;

    const build = () => {
        const wrapper = shallowMount(Button, {
            propsData: { ...props },
        });

        return {
            wrapper,
            btnWrapper: () => wrapper.find('.wrapper-btn'),
            button: () => wrapper.find('.btn'),
            icon: () => wrapper.find('.icon'),
        };
    };

    beforeEach(() => {
        props = {
            id: faker.random.uuid(),
            name: faker.random.word(),
            label: faker.random.word(),
            icon: faker.image.imageUrl(),
            onclick: jest.fn(),
        };
    });

    it('renders component', () => {
        const fixedProps: ButtonProps = {
            id: 'someID',
            name: 'someName',
            icon: 'some broken icon',
            label: 'someLabel',
            onclick: jest.fn(),
        };
        props = fixedProps;

        const { wrapper } = build();

        expect(wrapper).toMatchSnapshot();
    });

    it('check if props have been passed', () => {
        const { wrapper } = build();

        expect({ ...props }).toEqual({ ...wrapper.vm.$props });
    });

    it('renders main child components', () => {
        const { btnWrapper, button, icon } = build();

        expect(btnWrapper().exists()).toBe(true);
        expect(button().exists()).toBe(true);
        expect(icon().exists()).toBe(true);
    });

    it('clicks method', async () => {
        const { button } = build();

        await button().trigger('click');

        expect(props.onclick).toHaveBeenCalled();
    });

    it('sets buttons name.', async () => {
        const { button } = build();

        expect(props.name).toBe(button().attributes().name);
    });

    it('must call evt.preventDefault fn', async () => {
        const { button } = build();

        const opts = {
            preventDefault: jest.fn(),
        };

        button().trigger('click', opts);

        expect(opts.preventDefault).toHaveBeenCalled();
    });

    it('must set icon to the img src', async () => {
        const { icon } = build();

        expect(icon().attributes('src')).toBe(props.icon);
    });
});
