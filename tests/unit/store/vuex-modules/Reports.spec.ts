import Vue from 'vue';
import Vuex from 'vuex';
import { inject } from 'vuex-smart-module';
import { State, Mutations, Actions } from '@/store/modules/reports';
import {
    getFakeMeasuresReportData,
    getFakeQuantityReportData,
} from '../../utils/ReportsFactory';
import { getMeasuresReport, getQuantityReport } from '@/services/Reports';
import { MutationTypes } from '@/store/modules/reports';

jest.mock('@/services/Reports');

Vue.use(Vuex);

describe('Reports Vuex Module', () => {
    let state: State;
    let quantityReport = getFakeQuantityReportData();
    let measuresReport = getFakeMeasuresReportData();

    const build = () => {
        state = {
            isLoading: false,
            quantityReport,
            measuresReport,
        };
        const commit = jest.fn();

        const mutations = inject(Mutations, {
            state,
        });

        const actions = inject(Actions, {
            state,
            commit,
        });

        return {
            commit,
            mutations,
            actions,
        };
    };

    describe('mutations', () => {
        it('must set loading to true', () => {
            const { mutations } = build();

            state.isLoading = false;

            mutations.startLoading();

            expect(state.isLoading).toEqual(true);
        });

        it('must set loading to false', () => {
            const { mutations } = build();

            state.isLoading = true;

            mutations.finishLoading();

            expect(state.isLoading).toEqual(false);
        });

        it('must set quantity report data to state', () => {
            const { mutations } = build();

            const newReportData = getFakeQuantityReportData();

            mutations.setQuantityReport(newReportData);

            expect(state.quantityReport).toEqual(newReportData);
        });

        it('must set measures report data to state', () => {
            const { mutations } = build();

            const newReportData = getFakeMeasuresReportData();

            mutations.setMeasuresReport(newReportData);

            expect(state.measuresReport).toEqual(newReportData);
        });
    });

    describe('actions', () => {
        it('must set quantity report data to state', async () => {
            const { commit, actions } = build();

            await actions.fetchQuantityReport();

            expect(getQuantityReport).toBeCalled();

            expect(commit.mock.calls).toEqual([
                [MutationTypes.startLoading],
                [MutationTypes.setQuantityReport, undefined],
                [MutationTypes.finishLoading],
            ]);
        });

        it('must set measures report data to state', async () => {
            const { commit, actions } = build();

            await actions.fetchMeasuresReport();

            expect(getMeasuresReport).toBeCalled();

            expect(commit.mock.calls).toEqual([
                [MutationTypes.startLoading],
                [MutationTypes.setMeasuresReport, undefined],
                [MutationTypes.finishLoading],
            ]);
        });
    });
});
