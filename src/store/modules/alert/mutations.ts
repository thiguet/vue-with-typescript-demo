import { Mutations as VMutations } from 'vuex-smart-module';
import State from './state';

export enum MutationTypes {
    setMessage = 'setMessage',
}

export default class Mutations extends VMutations<State> {
    [MutationTypes.setMessage](payload: string) {
        this.state.message = payload;
    }
}
