import { MeasuresReport, QuantityReport } from '@/store/datatypes/models';

export default class ReportsState {
    isLoading = false;

    measuresReport: MeasuresReport = [];

    quantityReport: QuantityReport = [];
}
