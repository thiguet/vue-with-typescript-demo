import { Mutations as VMutations } from 'vuex-smart-module';
import { User } from '@/store/datatypes/models';
import State from './state';

export enum MutationTypes {
    setPassword = 'setPassword',
    setUsername = 'setUsername',
    setCurrentUser = 'setCurrentUser',
}

export default class Mutation extends VMutations<State> {
    [MutationTypes.setPassword](payload: string) {
        this.state.password = payload;
    }

    [MutationTypes.setUsername](payload: string) {
        this.state.username = payload;
    }

    [MutationTypes.setCurrentUser](payload: User) {
        this.state.currentUser = payload;
    }
}
