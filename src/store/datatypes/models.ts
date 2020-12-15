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

export interface LoginSubmit {
    name: string;
    pass: string;
}

export enum VuexAppModules {
    products = 'products',
    login = 'login',
    alert = 'alert',
}
