import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex from 'vuex';

import Login from '@/views/Login.vue';

import { baseURL } from '@/services/config.json';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login', () => {
    const build = () => {
        const wrapper: Wrapper<Login> = shallowMount(Login, {
            data: () => ({ baseURL }),
        });

        return {
            wrapper,
            facebookIcon: () => wrapper.find('#facebook'),
            githubIcon: () => wrapper.find('#github'),
            googleIcon: () => wrapper.find('#google'),
        };
    };

    it('renders component', () => {
        const { wrapper } = build();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders main child components', () => {
        const { facebookIcon, githubIcon, googleIcon } = build();

        expect(facebookIcon().exists()).toBe(true);
        expect(githubIcon().exists()).toBe(true);
        expect(googleIcon().exists()).toBe(true);
    });

    it('must have href equal to facebook login route', async () => {
        const { facebookIcon } = build();

        expect(facebookIcon().attributes('href')).toEqual(
            `${baseURL}/auth/facebook`,
        );
    });
    it('must have href equal to google login route', async () => {
        const { githubIcon } = build();
        expect(githubIcon().attributes('href')).toEqual(
            `${baseURL}/auth/github`,
        );
    });

    it('must have href equal to google login route', async () => {
        const { googleIcon } = build();

        expect(googleIcon().attributes('href')).toEqual(
            `${baseURL}/auth/google`,
        );
    });
});
