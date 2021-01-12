import {
    VueWithTSAPI,
    getQuantityReport,
    getMeasuresReport,
} from '@/services/Reports';
import { QuantityReport, MeasuresReport } from '@/store/datatypes/models';
import {
    getFakeQuantityReportData,
    getFakeMeasuresReportData,
} from '../utils/ReportsFactory';

describe('Report Service API', () => {
    let quantityReportData: QuantityReport;
    let measureReportData: MeasuresReport;

    beforeEach(() => {
        quantityReportData = getFakeQuantityReportData();
        measureReportData = getFakeMeasuresReportData();
    });

    it('must return quantity report data', async () => {
        jest.spyOn(VueWithTSAPI, 'get').mockResolvedValue({
            data: quantityReportData,
        });

        const result = await getQuantityReport();

        expect(VueWithTSAPI.get).toBeCalledWith('/reports/quantity');
        expect(result).toEqual(quantityReportData);
    });

    it('must return measures report data', async () => {
        jest.spyOn(VueWithTSAPI, 'get').mockResolvedValue({
            data: measureReportData,
        });

        const result = await getMeasuresReport();

        expect(VueWithTSAPI.get).toBeCalledWith('/reports/measures');
        expect(result).toEqual(measureReportData);
    });
});
