import { conduitAPI, clearJWT, setJWT, login } from '@/services/Login';
import { LoginSubmit, User } from '@/store/datatypes/models';
import faker from 'faker';

describe('Login Service API', () => {
    const getFakeJWT = () => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDA4MjQxMDgsImV4cCI6MTYzMjM2MDEwOCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.J1BuOaG52ACFR0h6MLKTRppjEfeoRjSSwJeU8Q80khg';

    it('sets the JWT Token on the axios object.', () => {
        const fakeJWT = getFakeJWT();

        setJWT(fakeJWT);

        expect(conduitAPI.defaults.headers.common.Authorization).toBe(
            `Bearer ${fakeJWT}`,
        );
    });

    it('deletes the JWT Token from the axios object.', () => {
        const fakeJWT = getFakeJWT();

        setJWT(fakeJWT);
        clearJWT();

        expect(conduitAPI.defaults.headers.common.Authorization).toBe(null);
    });

    it('should dispatch login action', async () => {
        const user: User = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
        };

        jest.spyOn(conduitAPI, 'post').mockResolvedValue({
            data: user,
        });

        const loginSubmitExample: LoginSubmit = {
            name: faker.internet.email(),
            pass: faker.internet.password(),
        };

        const result = await login(loginSubmitExample);

        expect(conduitAPI.post).toBeCalledWith('/users/login', {
            user: loginSubmitExample,
        });
        expect(result).toEqual(user);
    });
});
