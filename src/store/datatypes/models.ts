interface Unique {
    id?: string;
}

export enum Measures {
    UN = 'UN',
    L = 'L',
    KG = 'KG',
    G = 'G',
}

export interface Product extends Unique {
    name: string;
    measure: Measures;
    qtd: number;
    minQtd: number;
    image?: string;
}

export interface User extends Unique {
    name: string;
    email: string;
}

export interface ReportItem {
    text: string;
    value: number;
}

export type ReportData = ReportItem[];

export interface QuantityReportData {
    productName: string;
    productQuantity: number;
}

export type QuantityReport = QuantityReportData[];
export interface MeasuresReportData {
    measureName: string;
    measureQuantity: number;
}

export type MeasuresReport = MeasuresReportData[];

export enum VuexAppModules {
    products = 'products',
    login = 'login',
    alert = 'alert',
    reports = 'reports',
}
