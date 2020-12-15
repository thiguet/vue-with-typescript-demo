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
    const response = await VueWithTSAPI.post('/users/login', {
        user,
    });
    return response.data as User;
}
