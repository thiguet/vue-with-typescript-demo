import { Actions as VActions, Getters } from 'vuex-smart-module';
import State from './state';
import Mutations, { MutationTypes } from './mutations';

export enum ActionTypes {
    openAlert = 'openAlert',
    closeAlert = 'closeAlert',
}

export default class Actions extends VActions<
    State,
    {} & Getters<State>,
    Mutations,
    Actions
> {
    [ActionTypes.openAlert](payload: string) {
        this.commit(MutationTypes.setMessage, payload);
        this.commit(MutationTypes.openAlert);
    }

    [ActionTypes.closeAlert]() {
        this.commit(MutationTypes.setMessage, '');
        this.commit(MutationTypes.closeAlert);
    }
}
