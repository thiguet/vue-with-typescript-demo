import Vuex from 'vuex';
import store from '@/store';

describe('Store', () => {
  it('has to get a store instance', async (done) => {
    expect(store).toBeInstanceOf(Vuex.Store);
    done();
  });

  it('has login module in its instance', () => {
    expect(store.hasModule('login')).toBe(true);
  });
});
