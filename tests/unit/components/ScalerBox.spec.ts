import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex from 'vuex';

import ScalerBox from '@/components/ScalerBox.vue';
import faker from 'faker';
import { ScalerBoxProps } from './models';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Scaler Box Props', () => {
    const slotContent = '<div>Main Content</div>';
    let props: ScalerBoxProps;

    const build = () => {
        const componentBindings = {
            propsData: { ...props },
            slots: {
                default: slotContent,
            },
        };

        const wrapper: Wrapper<ScalerBox> = shallowMount(
            ScalerBox,
            componentBindings,
        );

        return {
            wrapper,
            boxContainer: () => wrapper.find('.box-container'),
            box: () => wrapper.find('.box'),
            info: () => wrapper.find('.info'),
        };
    };

    beforeEach(() => {
        props = {
            boxTitle: faker.random.words(),
        };
    });

    it('renders component', () => {
        props.boxTitle = 'teste';
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders child components', () => {
        const { box, boxContainer, info } = build();
        expect(box().exists()).toBe(true);
        expect(boxContainer().exists()).toBe(true);
        expect(info().exists()).toBe(true);
    });

    it('renders slot data', () => {
        const { box } = build();
        expect(box().html()).toContain(slotContent);
    });
    it('sets prop title to the info section', () => {
        const { wrapper, info } = build();
        expect(info().text()).toEqual(wrapper.props().boxTitle);
    });
});
