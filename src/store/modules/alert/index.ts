import { Module } from 'vuex-smart-module';
import Mutations, { MutationTypes as MTypes } from './mutations';

export const MutationTypes = MTypes;
export const AlertMutations = Mutations;

export class AlertState {
  message!: string;

  display!: boolean;
}

export default new Module({
    state: AlertState,
    mutations: AlertMutations,
});
