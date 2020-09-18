
export enum Measures {
    'UN',
    'L',
    'KG',
    'G',
}

export interface Product {
    name: string;
    measure: keyof typeof Measures;
    qtd: number;
    minQtd: number;
    img?: string;
}
