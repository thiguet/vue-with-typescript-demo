export interface LoginView {
    clickLogin(): void;
}

export interface AddProductView {
    submitForm(): void;
    chooseAnImageHandler(): void;
    handleImgFileChange(files: File[]): void;
    handleFileChange(): void;
    setImage(file: File): void;
}

export interface ProductsListView {
    routeToHomePage(): void;
    routeToNewProductPage(): void;
    routeToEditProductPage(): void;
    removeLine(index: number): void;
}

export interface DNDImageData {
    imageSource?: ArrayBuffer | string | null;
    wrongFile: boolean;
    isDragging: boolean;
}

export interface DNDImageMethods {
    drop(event: { dataTransfer: DataTransfer }): void;
    dragLeave(): void;
    dragOver(): void;
}

export type DNDImageComponent = DNDImageData & DNDImageMethods;

export interface Files {
    files: FileList;
}
