import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex from 'vuex';

import Card from '@/components/Card.vue';
import faker from 'faker';
import { CardProps } from './models';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login', () => {
    const slotContent = '<div>Main Content</div>';
    let props: CardProps;

    const build = () => {
        const componentBindings = {
            propsData: { ...props },
            slots: {
                default: slotContent,
            },
        };

        const wrapper: Wrapper<Card> = shallowMount(Card, componentBindings);

        const mountedWrapper: Wrapper<Card> = mount(Card, componentBindings);

        const CardComp = () => {
            const CardInstance = (wrapper.vm as unknown) as CardProps;

            jest.spyOn(CardInstance, 'onclick');

            return CardInstance;
        };

        return {
            wrapper,
            mountedWrapper,
            CardComp,
            container: () => wrapper.find('div'),
            img: () => wrapper.find('img'),
        };
    };

    beforeEach(() => {
        props = {
            onclick: jest.fn(),
            icon: faker.image.imageUrl(),
        };
    });

    it('renders component', () => {
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders child components', () => {
        const { container } = build();
        expect(container().exists()).toBe(true);
    });

    it('renders slot data', () => {
        const { wrapper } = build();
        expect(wrapper.html()).toContain(slotContent);
    });

    it('renders slot data', async () => {
        const { wrapper, CardComp } = build();
        await wrapper.trigger('click');
        expect(CardComp().onclick).toHaveBeenCalled();
    });

    it('sets icon prop to the src of the img component', async () => {
        const { img } = build();
        expect(img().attributes('src')).toBe(props.icon);
    });
});
