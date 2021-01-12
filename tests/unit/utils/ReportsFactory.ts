import { getRandomMeasure } from './ProductFactory';
import {
    MeasuresReport,
    MeasuresReportData,
    QuantityReport,
    QuantityReportData,
} from '@/store/datatypes/models';
import faker from 'faker';
import { generateRandomArray } from './ArrayHelper';

export const getFakeMeasuresReportItem = (): MeasuresReportData => ({
    measureName: getRandomMeasure(),
    measureQuantity: faker.random.number(),
});

export const getFakeQuantityReportItem = (): QuantityReportData => ({
    productName: faker.commerce.productName(),
    productQuantity: faker.random.number(),
});

export const getFakeQuantityReportData = (): QuantityReport =>
    generateRandomArray<QuantityReportData>(getFakeQuantityReportItem);

export const getFakeMeasuresReportData = (): MeasuresReport =>
    generateRandomArray<MeasuresReportData>(getFakeMeasuresReportItem);
