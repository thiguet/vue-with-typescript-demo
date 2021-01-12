import { QuantityReport, MeasuresReport } from '@/store/datatypes/models';

import VueWithTSAPI from '@/services/';

export { VueWithTSAPI };

export async function getQuantityReport(): Promise<QuantityReport> {
    return (await VueWithTSAPI.get('/reports/quantity')).data as QuantityReport;
}

export async function getMeasuresReport(): Promise<MeasuresReport> {
    return (await VueWithTSAPI.get('/reports/measures')).data as MeasuresReport;
}
