import Vue from 'vue';
import Vuex from 'vuex';
import { inject } from 'vuex-smart-module';
import {
    State,
    Mutations,
    Actions,
    MutationTypes,
} from '@/store/modules/login';
import faker from 'faker';
import { User } from '@/store/datatypes/models';

Vue.use(Vuex);

describe('Login Vuex Module', () => {
    let state: State;

    const getNewUser = (): User => ({
        id: faker.random.uuid(),
        name: faker.name.firstName(),
        email: faker.internet.email(),
    });

    const build = () => {
        const username = faker.internet.userName();
        const currentUser: User = {
            ...getNewUser(),
            name: username,
        };

        state = {
            currentUser,
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

    describe('mutations', () => {
        it('sets the user to the state.', () => {
            const newUser = getNewUser();

            const { mutations } = build();

            mutations.setCurrentUser(newUser);

            expect({ ...state }).toEqual({
                ...state,
                currentUser: newUser,
            });
        });
    });

    describe('actions', () => {
        it('sets the user to the state.', () => {
            const { actions, commit } = build();

            actions.login();

            expect(commit).toBeCalledWith(MutationTypes.setCurrentUser, {});
        });
    });
});
