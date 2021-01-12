import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex, { ModuleTree, Store } from 'vuex';
import VueRouter from 'vue-router';

import Reports from '@/views/Reports.vue';
import {
    MeasuresReport,
    QuantityReport,
    VuexAppModules,
} from '@/store/datatypes/models';
import { State, MutationTypes, ActionTypes } from '@/store/modules/reports';

import { ReportsVuex } from '../store/models';
import {
    getFakeMeasuresReportData,
    getFakeQuantityReportData,
} from '../utils/ReportsFactory';

jest.mock('@/services/Reports');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('Reports', () => {
    let store: Store<State>;

    let reports: ReportsVuex;

    let quantityReport: QuantityReport;
    let measuresReport: MeasuresReport;

    const build = () => {
        reports = {
            namespaced: true,
            state: {
                isLoading: false,
                quantityReport,
                measuresReport,
            },
            getters: {},
            mutations: {
                [MutationTypes.setMeasuresReport]: jest.fn(),
                [MutationTypes.setQuantityReport]: jest.fn(),
            },
            actions: {
                [ActionTypes.fetchMeasuresReport]: jest.fn(),
                [ActionTypes.fetchQuantityReport]: jest.fn(),
            },
        };

        const modules: ModuleTree<State> = {
            [VuexAppModules.reports]: {
                ...reports,
            },
        };

        store = new Vuex.Store({
            modules,
        });

        const options = {
            localVue,
            store,
            router,
        };

        const wrapper: Wrapper<Reports> = shallowMount(Reports, options);
        const mountedWrapper: Wrapper<Reports> = mount(Reports, options);

        return {
            wrapper,
            donutChart: () => mountedWrapper.find('#donut-chart'),
            lineChart: () => mountedWrapper.find('#line-chart'),
            goBackButton: () => mountedWrapper.find('#go-back'),
        };
    };

    beforeEach(() => {
        quantityReport = getFakeQuantityReportData();
        measuresReport = getFakeMeasuresReportData();

        router.push = jest.fn();
    });

    it('renders component', () => {
        quantityReport = [
            {
                productName: 'teste',
                productQuantity: 10,
            },
        ];
        measuresReport = [
            {
                measureName: 'teste',
                measureQuantity: 20,
            },
        ];

        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders main components', () => {
        const { lineChart, donutChart } = build();
        expect(donutChart().exists()).toBe(true);
        expect(lineChart().exists()).toBe(true);
    });

    it('go back to home page', async () => {
        const { goBackButton } = build();

        await goBackButton().trigger('click');

        expect(router.push).toHaveBeenCalledWith('/');
    });

    it('must fetch data on mounting', () => {
        const { actions } = reports;

        build();

        expect(actions.fetchQuantityReport).toBeCalled();
        expect(actions.fetchMeasuresReport).toBeCalled();
    });

    it('donut chart must receive vuex bindings', async () => {
        const { donutChart } = build();
        expect(
            donutChart()
                .props()
                .data.sort((a: any, b: any) => a.value - b.value),
        ).toEqual(
            measuresReport
                .map((MRItem) => ({
                    text: MRItem.measureName,
                    value: MRItem.measureQuantity,
                }))
                .sort((a, b) => a.value - b.value),
        );
    });

    it('line chart must receive vuex bindings', async () => {
        const { lineChart } = build();
        expect(
            lineChart()
                .props()
                .data.sort((a: any, b: any) => a.value - b.value),
        ).toEqual(
            quantityReport
                .map((MRItem) => ({
                    text: MRItem.productName,
                    value: MRItem.productQuantity,
                }))
                .sort((a, b) => a.value - b.value),
        );
    });
});
