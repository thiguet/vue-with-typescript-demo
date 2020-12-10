export enum Measures {
    UN = 'UN',
    L = 'L',
    KG = 'KG',
    G = 'G',
}

export interface Product {
    name: string;
    measure: Measures;
    qtd: number;
    minQtd: number;
    image?: File | string;
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
