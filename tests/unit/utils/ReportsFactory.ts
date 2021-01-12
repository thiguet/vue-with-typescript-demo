import { getRandomMeasure } from './ProductFactory';
import {
    MeasuresReport,
    MeasuresReportData,
    QuantityReport,
    QuantityReportData,
    ReportData,
    ReportItem,
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

export const getFakeReportItem = () => ({
    text: faker.commerce.productName(),
    value: faker.random.number(),
});

export const getFakeQuantityReportData = (): QuantityReport =>
    generateRandomArray<QuantityReportData>(getFakeQuantityReportItem);

export const getFakeMeasuresReportData = (): MeasuresReport =>
    generateRandomArray<MeasuresReportData>(getFakeMeasuresReportItem);

export const getFakeReportData = (): ReportData =>
    generateRandomArray<ReportItem>(getFakeReportItem);
