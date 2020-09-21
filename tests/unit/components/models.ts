export interface BaseProps {
    id: string;
}

export interface BaseInput extends BaseProps {
    value: string;
    setValue: Function;
}

export interface TextInputProps extends BaseInput {
    type?: 'text' | 'password' | undefined;
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
    label: string;
    onclick: Function;
}
export type DNDImageProps = BaseInput;
export interface AlertProps {
    isVisible: boolean;
    closeFn: Function;
    message: string;
}
