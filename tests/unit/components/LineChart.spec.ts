import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex from 'vuex';

import LineChart from '@/components/LineChart.vue';
import { LineChartProps } from './models';
import { getFakeReportData } from '../utils/ReportsFactory';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Line Chart', () => {
    let props: LineChartProps;

    const build = () => {
        const componentBindings = {
            propsData: { ...props },
        };

        const wrapper: Wrapper<LineChart> = shallowMount(
            LineChart,
            componentBindings,
        );
        const mountedWrapper: Wrapper<LineChart> = mount(
            LineChart,
            componentBindings,
        );

        return {
            wrapper,
            mountedWrapper,
            chart: () => wrapper.find('#line-chart'),
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
