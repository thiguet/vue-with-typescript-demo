import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';
import faker from 'faker';
import { ButtonProps } from './models';

const fixedProps: ButtonProps = {
    id: 'someID',
    name: 'someName',
    label: 'someLabel',
    onclick: jest.fn(),
};

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
        };
    };

    beforeEach(() => {
        props = {
            id: faker.random.uuid(),
            name: faker.random.word(),
            label: faker.random.word(),
            onclick: jest.fn(),
        };
    });

    it('renders component', () => {
        props.id = faker.random.uuid();
        props.name = faker.random.word();
        props.label = faker.random.word();

        const { wrapper } = build();

        expect(wrapper).toMatchSnapshot();
    });

    it('renders main child components', () => {
        const { btnWrapper, button } = build();

        expect(btnWrapper().exists()).toBe(true);
        expect(button().exists()).toBe(true);
    });

    it('clicks method', async () => {
        const { button } = build();

        await button().trigger('click');

        expect(props.onclick).toHaveBeenCalled();
    });

    it('must call evt.preventDefault fn', async () => {
        const { button } = build();

        const opts = {
            preventDefault: jest.fn(),
        };

        button().trigger('click', opts);

        expect(opts.preventDefault).toHaveBeenCalled();
    });
});
