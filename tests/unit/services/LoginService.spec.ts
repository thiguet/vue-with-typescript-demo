import { logout } from '@/services/Login';
import { VueWithTSAPI } from '@/services/Products';

describe('Login Service API', () => {
    it('must log the user out', async () => {
        jest.spyOn(VueWithTSAPI, 'get').mockResolvedValue(null);

        await logout();

        expect(VueWithTSAPI.get).toBeCalledWith('/auth/logout');
    });
});
