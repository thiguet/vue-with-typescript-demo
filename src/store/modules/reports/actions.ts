import { Actions as VActions, Getters } from 'vuex-smart-module';
import { getMeasuresReport, getQuantityReport } from '@/services/Reports';
import State from './state';
import Mutations, { MutationTypes } from './mutations';

export enum ActionTypes {
    fetchMeasuresReport = 'fetchMeasuresReport',
    fetchQuantityReport = 'fetchQuantityReport',
}

export default class Actions extends VActions<
    State,
    Getters<State>,
    Mutations,
    Actions
> {
    async [ActionTypes.fetchQuantityReport]() {
        try {
            this.commit(MutationTypes.startLoading);
            this.commit(
                MutationTypes.setQuantityReport,
                await getQuantityReport(),
            );
        } finally {
            this.commit(MutationTypes.finishLoading);
        }
    }

    async [ActionTypes.fetchMeasuresReport]() {
        try {
            this.commit(MutationTypes.startLoading);
            this.commit(
                MutationTypes.setMeasuresReport,
                await getMeasuresReport(),
            );
        } finally {
            this.commit(MutationTypes.finishLoading);
        }
    }
}
