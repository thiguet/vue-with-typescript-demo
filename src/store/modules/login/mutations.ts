import { Mutations as VMutations } from 'vuex-smart-module';
import { User } from '@/store/datatypes/models';
import State from './state';

export enum MutationTypes {
    setCurrentUser = 'setCurrentUser',
}

export default class Mutation extends VMutations<State> {
    [MutationTypes.setCurrentUser](payload: User) {
        this.state.currentUser = payload;
    }
}
