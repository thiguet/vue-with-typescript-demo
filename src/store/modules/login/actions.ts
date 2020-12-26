import { Actions as VActions, Getters } from 'vuex-smart-module';
import { LoginSubmit } from '@/store/datatypes/models';
import {
    login,
    facebookService,
    googleService,
    githubService,
} from '@/services/Login';
import { Store } from 'vuex';
import State from './state';
import Mutations, { MutationTypes } from './mutations';

export enum ActionTypes {
    loginAction = 'loginAction',
    facebookLogin = 'facebookLogin',
    githubLogin = 'githubLogin',
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

    githubService!: typeof githubService;

    $init(store: Store<State>): void {
        this.store = store;
        this.login = login;
        this.facebookService = facebookService;
        this.googleService = googleService;
        this.githubService = githubService;
    }

    async [ActionTypes.loginAction](payload: LoginSubmit) {
        const result = await this.login(payload);

        this.commit(MutationTypes.setCurrentUser, result);
    }

    async [ActionTypes.facebookLogin]() {
        const result = await this.facebookService();

        this.commit(MutationTypes.setCurrentUser, result);
    }

    async [ActionTypes.githubLogin]() {
        const result = await this.githubService();

        this.commit(MutationTypes.setCurrentUser, result);
    }

    async [ActionTypes.googleLogin]() {
        const result = await this.googleService();

        this.commit(MutationTypes.setCurrentUser, result);
    }
}
