import axios from 'axios';
import { UserSubmit, UserResponse } from './datatypes/models.d';

export const conduitAPI = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
});

export function setJWT(jwt: string) {
  conduitAPI.defaults.headers.common.Authorization = `Token ${jwt}`;
}

export function clearJWT() {
  delete conduitAPI.defaults.headers.common.Authorization;
}

export async function loginUser(user: UserSubmit): Promise<UserResponse|undefined> {
  try {
    const response = await axios.post('/users/login', {
      user,
    });
    return (response.data as UserResponse);
  } catch (e) {
    console.error(e);
  }
  return undefined;
}
