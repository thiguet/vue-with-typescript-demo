import { Measures } from '@/store/datatypes/models';
import faker from 'faker';

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
