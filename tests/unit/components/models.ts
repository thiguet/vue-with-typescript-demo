import { Product } from '@/store/datatypes/models';

export interface BaseProps {
    id: string;
}

export interface BaseInput extends BaseProps {
    value: string;
    setValue: Function;
}

export interface TextInputProps extends BaseInput {
    type?: 'text' | 'password';
}

export interface NumberInputProps extends BaseInput {
    min?: number;
    max?: number;
}

export interface InputWrapperProps {
    label: string;
    legend?: string;
}

export interface ButtonProps extends BaseProps {
    name: string;
    onclick: Function;
    label?: string;
    icon?: string;
}
export type DNDImageProps = BaseInput;
export interface AlertProps {
    isVisible: boolean;
    closeFn: Function;
    message: string;
}

export enum ImageMimeTypes {
    png = 'image/png',
    jpeg = 'image/jpeg',
}
export interface CardProps {
    onclick(): void;
    icon: string;
}

export interface ProductsTableProps {
    rows: Array<Product>;
}
