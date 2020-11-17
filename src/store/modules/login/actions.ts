import { Actions as VActions, Getters } from 'vuex-smart-module';
import { LoginSubmit } from '@/store/datatypes/models';
import { login } from '@/services/Login';
import { Store } from 'vuex';
import State from './state';
import Mutations, { MutationTypes } from './mutations';

export enum ActionTypes {
    loginAction = 'loginAction',
}

export default class Actions extends VActions<
    State,
    {} & Getters<State>,
    Mutations,
    Actions
> {
    store!: Store<State>;

    login!: typeof login;

    $init(store: Store<State>): void {
        this.store = store;
        this.login = login;
    }

    async [ActionTypes.loginAction](payload: LoginSubmit) {
        const result = await this.login(payload);

        this.commit(MutationTypes.setCurrentUser, result);
        // else
        // this.dispatch()
    }
}
