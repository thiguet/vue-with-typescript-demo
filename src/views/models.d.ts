export interface LoginView {
    clickLogin(): void;
}

export interface AddProductView {
    submitForm(): void;
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
