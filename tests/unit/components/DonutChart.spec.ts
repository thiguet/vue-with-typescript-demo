import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex from 'vuex';

import DonutChart from '@/components/DonutChart.vue';
import { DonutChartProps } from './models';
import { getFakeReportData } from '../utils/ReportsFactory';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Donut Chart', () => {
    let props: DonutChartProps;

    const build = () => {
        const componentBindings = {
            propsData: { ...props },
        };

        const wrapper: Wrapper<DonutChart> = shallowMount(
            DonutChart,
            componentBindings,
        );
        const mountedWrapper: Wrapper<DonutChart> = mount(
            DonutChart,
            componentBindings,
        );

        return {
            wrapper,
            mountedWrapper,
            chart: () => wrapper.find('#donut-chart'),
        };
    };

    beforeEach(() => {
        props = {
            data: getFakeReportData(),
        };
    });

    it('renders main components', () => {
        const { chart } = build();
        expect(chart().exists()).toBe(true);
    });
});
