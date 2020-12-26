import { LoginSubmit, User } from '../store/datatypes/models';

import VueWithTSAPI from './index';

export { VueWithTSAPI };

export const setJWT = (jwt: string) => {
    VueWithTSAPI.defaults.headers.common.Authorization = `Bearer ${jwt}`;
};

export const clearJWT = () => {
    VueWithTSAPI.defaults.headers.common.Authorization = null;
};

export async function login(user: LoginSubmit): Promise<User> {
    return (
        await VueWithTSAPI.post('/users/login', {
            user,
        })
    ).data as User;
}

export async function googleService(): Promise<User> {
    return (await VueWithTSAPI.get('/auth/google')).data as User;
}

export async function facebookService(): Promise<User> {
    return (await VueWithTSAPI.get('/auth/facebook')).data as User;
}

export async function githubService(): Promise<User> {
    return (await VueWithTSAPI.get('/auth/github')).data as User;
}
