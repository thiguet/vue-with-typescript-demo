import { Mutations as VMutations } from 'vuex-smart-module';
import { MeasuresReport, QuantityReport } from '@/store/datatypes/models';
import State from './state';

export enum MutationTypes {
    startLoading = 'startLoading',
    finishLoading = 'finishLoading',
    setQuantityReport = 'setQuantityReport',
    setMeasuresReport = 'setMeasuresReport',
}

export default class Mutations extends VMutations<State> {
    [MutationTypes.startLoading]() {
        this.state.isLoading = true;
    }

    [MutationTypes.finishLoading]() {
        this.state.isLoading = false;
    }

    [MutationTypes.setQuantityReport](payload: QuantityReport) {
        this.state.quantityReport = payload;
    }

    [MutationTypes.setMeasuresReport](payload: MeasuresReport) {
        this.state.measuresReport = payload;
    }
}
