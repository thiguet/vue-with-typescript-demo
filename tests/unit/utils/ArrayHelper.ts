import faker from 'faker';

const generateRandomArray = <T>(mapFn: () => T): T[] =>
    Array(faker.random.number({ min: 1, max: 50 }))
        .fill(null)
        .map(mapFn);

export default generateRandomArray;
