import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store';
import { State, MutationTypes } from '@/store/modules/alert';
import faker from 'faker';

Vue.use(Vuex);

const namespace = 'alert/';

describe('Alert Vuex Module', () => {
    let state: State;

    beforeEach(() => {
        state = store.state.alert;
    });

    it('sets the message to the state.', () => {
        const newMessage = faker.random.words();

        store.commit(namespace + MutationTypes.setMessage, newMessage);

        expect({ ...state }).toEqual({
            ...state,
            message: newMessage,
        });
    });
});
