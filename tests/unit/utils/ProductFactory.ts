import { Measures, Product } from '@/store/datatypes/models';
import faker from 'faker';
import generateRandomArray from './ArrayHelper';

export const getRandomMeasure = () =>
    faker.random.arrayElement(Object.values(Measures)) as Measures;

export const getFakeProduct = () => ({
    id: faker.random.uuid(),
    name: faker.random.word(),
    measure: getRandomMeasure(),
    qtd: faker.random.number(),
    minQtd: faker.random.number(),
    image: faker.image.image(),
});

export const getFakeProductArray = (): Array<Product> =>
    generateRandomArray<Product>(getFakeProduct);
