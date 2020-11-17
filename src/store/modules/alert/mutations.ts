import { Mutations as VMutations } from 'vuex-smart-module';
import State from './state';

export enum MutationTypes {
    setMessage = 'setMessage',
    openAlert = 'openAlert',
    closeAlert = 'closeAlert',
}

export default class Mutations extends VMutations<State> {
    [MutationTypes.setMessage](payload: string) {
        this.state.message = payload;
    }

    [MutationTypes.openAlert]() {
        this.state.display = true;
    }

    [MutationTypes.closeAlert]() {
        this.state.display = false;
    }
}
