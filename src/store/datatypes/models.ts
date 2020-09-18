export enum Measures {
    UN = 'UN',
    L = 'L',
    KG = 'KG',
    G = 'G',
}

export interface Product {
    name: string;
    measure: keyof typeof Measures;
    qtd: number;
    minQtd: number;
    img?: string;
}

export interface User {
    name: string;
    email: string;
}

export interface LoginSubmit {
    name: string;
    pass: string;
}

export enum VuexAppModules {
    products = 'products',
    login = 'login',
    alert = 'alert',
}
