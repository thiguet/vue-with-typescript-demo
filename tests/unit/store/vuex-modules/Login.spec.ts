import Vue from 'vue';
import Vuex from 'vuex';
import { inject } from 'vuex-smart-module';
import {
    LoginState,
    MutationTypes,
    Mutations,
    Actions,
} from '@/store/modules/login';
import faker from 'faker';
import { LoginSubmit, User } from '@/store/datatypes/models';
import { login } from '@/services/Login';

Vue.use(Vuex);

describe('Login Vuex Module', () => {
    let state: LoginState;

    const build = () => {
        const username = faker.internet.userName();
        const password = faker.internet.password();
        const currentUser: User = {
            name: username,
            email: faker.internet.email(),
        };

        state = {
            username,
            password,
            currentUser,
        };
        const commit = jest.fn();

        const mutations = inject(Mutations, {
            state,
        });

        const getActions = (loginFn: typeof login) => ({
            ...inject(Actions, {
                commit,
                login: loginFn,
            }),
        });
        return {
            commit,
            mutations,
            getActions,
        };
    };

    it('sets the username to the state.', () => {
        const newUsername = faker.internet.userName();

        const { mutations } = build();

        mutations.setUsername(newUsername);

        expect({ ...state }).toEqual({
            ...state,
            username: newUsername,
        });
    });

    it('sets the password to the state.', () => {
        const newPassword = faker.internet.password();

        const { mutations } = build();

        mutations.setPassword(newPassword);

        expect({ ...state }).toEqual({
            ...state,
            password: newPassword,
        });
    });

    it('sets the user to the state.', () => {
        const newUser: User = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
        };

        const { mutations } = build();

        mutations.setCurrentUser(newUser);

        expect({ ...state }).toEqual({
            ...state,
            currentUser: newUser,
        });
    });

    it('dispatches a valid login action', async () => {
        const loginSubmit: LoginSubmit = {
            name: faker.internet.userName(),
            pass: faker.internet.password(),
        };

        const currentUser: User = {
            name: loginSubmit.name,
            email: faker.internet.email(),
        };

        const { commit } = build();

        const loginSuccess = jest.fn().mockResolvedValue(currentUser);

        const actions = inject(Actions, {
            commit,
            login: loginSuccess,
        });

        await actions.loginAction(loginSubmit);

        expect(actions.login).toHaveBeenCalled();

        expect(commit).toHaveBeenCalledWith(
            MutationTypes.setCurrentUser,
            currentUser,
        );
    });
});
