import Vuex from 'vuex';
import { factory } from './storeFactory';

describe('Store', () => {
  it('has to get a store instance', async (done) => {
    const service = factory();
    expect(service).toBeInstanceOf(Vuex.Store);
    done();
  });

  it('has login module in its instance', () => {
    expect(factory().hasModule('login')).toBe(true);
  });
});
