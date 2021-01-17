import VueWithTSAPI from './index';

export { VueWithTSAPI };

export async function logout(): Promise<void> {
    await VueWithTSAPI.get('/auth/logout');
}
