import { Actions as VActions, Getters } from 'vuex-smart-module';
import { LoginSubmit } from '@/store/datatypes/models';
import {
    login,
    facebookService,
    googleService,
    twitterService,
} from '@/services/Login';
import { Store } from 'vuex';
import State from './state';
import Mutations, { MutationTypes } from './mutations';

export enum ActionTypes {
    loginAction = 'loginAction',
    facebookLogin = 'facebookLogin',
    twitterLogin = 'twitterLogin',
    googleLogin = 'googleLogin',
}

export default class Actions extends VActions<
    State,
    Getters<State>,
    Mutations,
    Actions
> {
    store!: Store<State>;

    login!: typeof login;

    facebookService!: typeof facebookService;

    googleService!: typeof googleService;

    twitterService!: typeof twitterService;

    $init(store: Store<State>): void {
        this.store = store;
        this.login = login;
        this.facebookService = facebookService;
        this.googleService = googleService;
        this.twitterService = twitterService;
    }

    async [ActionTypes.loginAction](payload: LoginSubmit) {
        const result = await this.login(payload);

        this.commit(MutationTypes.setCurrentUser, result);
    }

    async [ActionTypes.facebookLogin]() {
        const result = await this.facebookService();

        this.commit(MutationTypes.setCurrentUser, result);
    }

    async [ActionTypes.twitterLogin]() {
        const result = await this.twitterService();

        this.commit(MutationTypes.setCurrentUser, result);
    }

    async [ActionTypes.googleLogin]() {
        const result = await this.googleService();

        this.commit(MutationTypes.setCurrentUser, result);
    }
}
