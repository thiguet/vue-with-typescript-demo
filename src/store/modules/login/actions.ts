import { Actions as VActions, Getters } from 'vuex-smart-module';
import { User } from '@/store/datatypes/models';
import State from './state';
import Mutations, { MutationTypes } from './mutations';

export enum ActionTypes {
    login = 'login',
}

export default class Actions extends VActions<
    State,
    Getters<State>,
    Mutations,
    Actions
> {
    async [ActionTypes.login]() {
        this.commit(MutationTypes.setCurrentUser, ({} as unknown) as User);
    }
}
