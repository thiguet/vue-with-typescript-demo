import axios from 'axios';
import { LoginSubmit, User } from '../store/datatypes/models';

export const conduitAPI = axios.create({
    baseURL: 'https://conduit.productionready.io/api',
    headers: {
        Accept: 'application/json',
    },
});

export const setJWT = (jwt: string) => {
    conduitAPI.defaults.headers.common.Authorization = `Bearer ${jwt}`;
};

export const clearJWT = () => {
    conduitAPI.defaults.headers.common.Authorization = null;
};

export async function login(user: LoginSubmit): Promise<User> {
    const response = await conduitAPI.post('/users/login', {
        user,
    });
    return response.data as User;
}
