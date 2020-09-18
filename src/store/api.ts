import axios from 'axios';
import { LoginSubmit, User } from './datatypes/models';

export const conduitAPI = axios.create({
    baseURL: 'https://conduit.productionready.io/api',
});

export function setJWT(jwt: string) {
    conduitAPI.defaults.headers.common.Authorization = `Token ${jwt}`;
}

export function clearJWT() {
    delete conduitAPI.defaults.headers.common.Authorization;
}

export async function login(user: LoginSubmit): Promise<User> {
    const response = await axios.post('/users/login', {
        user,
    });
    return response.data as User;
}
