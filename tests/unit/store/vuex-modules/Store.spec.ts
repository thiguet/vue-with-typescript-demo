import Vuex from 'vuex';
import store from '@/store';
import { VuexAppModules } from '@/store/datatypes/models';

describe('Store', () => {
    it('has to get a store instance', () => {
        expect(store).toBeInstanceOf(Vuex.Store);
    });

    it("has all VuexAppModule's in its instance", () => {
        const modules = Object.values(VuexAppModules);

        modules.forEach((module) => {
            expect(store.hasModule(module)).toBe(true);
        });
    });
});
