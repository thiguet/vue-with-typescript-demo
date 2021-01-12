import { ReportData } from '@/store/datatypes/models';

export interface LoginView {
    baseURL: string;
}

export interface AddProductView {
    image: string;
    submitForm(): void;
    chooseAnImageHandler(): void;
    handleImgFileChange(files: File[]): void;
    handleFileChange(): void;
    setImage(file: File): void;
}

export interface ProductsListView {
    routeToHomePage(): void;
    routeToNewProductPage(): void;
    routeToEditProductPage(index: number): void;
    removeLine(index: number): void;
}

export interface HomeView {
    routeToProducts(): void;
    routeToReports(): void;
    routeToLogin(): void;
}

export interface DNDImageData {
    imageSource?: ArrayBuffer | string | null;
    wrongFile: boolean;
    isDragging: boolean;
    syncedValue?: ArrayBuffer | string | null;
}

export interface DNDImageMethods {
    drop(event: { dataTransfer: DataTransfer }): void;
    dragLeave(): void;
    dragOver(): void;
    onValueChange(): void;
}

export type DNDImageComponent = DNDImageData & DNDImageMethods;

export interface Files {
    files: FileList;
}

export interface ReportsView {
    donutChartData(): ReportData;
    lineChartData(): ReportData;
}
