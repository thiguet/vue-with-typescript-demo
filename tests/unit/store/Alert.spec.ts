import Vue from 'vue';
import Vuex from 'vuex';
import { State, Mutations, Actions } from '@/store/modules/alert';
import faker from 'faker';
import { inject } from 'vuex-smart-module';

Vue.use(Vuex);

describe('Alert Vuex Module', () => {
    let state: State;

    const build = () => {
        state = {
            message: faker.lorem.words(),
            display: faker.random.boolean(),
        };

        const commit = jest.fn();

        const mutations = inject(Mutations, {
            state,
        });

        const actions = inject(Actions, {
            commit,
        });
        return {
            commit,
            mutations,
            actions,
        };
    };

    it('sets the message to the state.', () => {
        const message = faker.lorem.words();

        const { mutations } = build();

        mutations.setMessage(message);

        expect({ ...state }).toEqual({
            ...state,
            message,
        });
    });

    it('sets the display to false to the state.', () => {
        const { mutations } = build();

        mutations.closeAlert();

        expect({ ...state }).toEqual({
            ...state,
            display: false,
        });
    });

    it('sets the display to true to the state.', () => {
        const { mutations } = build();

        mutations.openAlert();

        expect({ ...state }).toEqual({
            ...state,
            display: true,
        });
    });

    it('openAlert Action: open dialog with the new message.', async () => {
        const newMessage = faker.random.words();

        const { actions } = build();

        await actions.openAlert(newMessage);

        setTimeout(() => {
            expect({ ...state }).toBe({
                message: newMessage,
                display: true,
            });
        });
    });

    it('closeAlert Action: close dialog and cleaning the message.', async () => {
        const { actions } = build();

        await actions.closeAlert();

        setTimeout(() => {
            expect({ ...state }).toBe({
                message: '',
                display: false,
            });
        });
    });
});
