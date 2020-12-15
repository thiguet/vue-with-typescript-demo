import { Getters as VGetters } from 'vuex-smart-module';
import State from './state';

export enum GettersTypes {
    tableRows = 'tableRows',
}
export default class Getters extends VGetters<State> {
    get [GettersTypes.tableRows]() {
        return this.state.products.map((p) => ({
            icon: p.image,
            name: p.name,
        }));
    }
}
