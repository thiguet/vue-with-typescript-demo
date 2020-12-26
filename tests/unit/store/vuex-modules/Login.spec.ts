import Vue from 'vue';
import Vuex from 'vuex';
import { inject } from 'vuex-smart-module';
import {
    State,
    MutationTypes,
    Mutations,
    Actions,
} from '@/store/modules/login';
import faker from 'faker';
import { LoginSubmit, User } from '@/store/datatypes/models';
import { login } from '@/services/Login';

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
        const password = faker.internet.password();
        const currentUser: User = {
            ...getNewUser(),
            name: username,
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

    describe('mutations', () => {
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
        it('dispatches a valid login action', async () => {
            const loginSubmit: LoginSubmit = {
                name: faker.internet.userName(),
                pass: faker.internet.password(),
            };

            const currentUser = {
                ...getNewUser(),
                name: loginSubmit.name,
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

    it('dispatch a github login attempt', async () => {
        const currentUser = {
            ...getNewUser(),
        };

        const { commit } = build();

        const loginSuccess = jest.fn().mockResolvedValue(currentUser);

        const actions = inject(Actions, {
            commit,
            githubService: loginSuccess,
        });

        await actions.githubLogin();

        expect(actions.githubService).toHaveBeenCalled();

        expect(commit).toHaveBeenCalledWith(
            MutationTypes.setCurrentUser,
            currentUser,
        );
    });

    it('dispatch a facebook login attempt', async () => {
        const currentUser = {
            ...getNewUser(),
        };

        const { commit } = build();

        const loginSuccess = jest.fn().mockResolvedValue(currentUser);

        const actions = inject(Actions, {
            commit,
            facebookService: loginSuccess,
        });

        await actions.facebookLogin();

        expect(actions.facebookService).toHaveBeenCalled();

        expect(commit).toHaveBeenCalledWith(
            MutationTypes.setCurrentUser,
            currentUser,
        );
    });

    it('dispatch a google login attempt', async () => {
        const currentUser = {
            ...getNewUser(),
        };

        const { commit } = build();

        const loginSuccess = jest.fn().mockResolvedValue(currentUser);

        const actions = inject(Actions, {
            commit,
            googleService: loginSuccess,
        });

        await actions.googleLogin();

        expect(actions.googleService).toHaveBeenCalled();

        expect(commit).toHaveBeenCalledWith(
            MutationTypes.setCurrentUser,
            currentUser,
        );
    });
});
