import Vue from 'vue';
import Vuex, { ModuleTree, Store } from 'vuex';
import { shallowMount, createLocalVue, Wrapper, mount } from '@vue/test-utils';

interface BasicBuild {
    wrapper: any,
    mountedWrapper: any,
}

export default abstract class View<VueComponent, VuexStoreType, BuildType> {
    protected store!: Store<VuexStoreType>;
    protected localVue: any;
    protected component: VueComponent;
    protected modules: ModuleTree<VuexStoreType>;

    constructor(comp: VueComponent, vuexModules: ModuleTree<VuexStoreType>) {
        this.component = comp;
        this.modules = vuexModules;

        this.localVue = createLocalVue();
        this.localVue.use(Vuex);
        
        this.store = new Vuex.Store({
            modules: this.modules,
        });
    }

    protected build(): BasicBuild {
        const wrapper = shallowMount(this.component, {
            localVue: this.localVue,
            store: this.store,
        });
        const mountedWrapper = mount(this.component, {
            localVue: this.localVue,
            store: this.store,
        });

        return {
            wrapper,
            mountedWrapper,
        };
    }
}
