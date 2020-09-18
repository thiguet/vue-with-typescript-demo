import axios from 'axios';

export const conduitAPI = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
});

export function setJWT(jwt: string) {
  conduitAPI.defaults.headers.common.Authorization = `Token ${jwt}`;
}

export function clearJWT() {
  delete conduitAPI.defaults.headers.common.Authorization;
}

export async function loginUser(user: any): Promise<any> {
  try {
    const response = await axios.post('/users/login', {
      user,
    });
    return (response.data as any);
  } catch (e) {
    console.error(e);
  }
  return undefined;
}
