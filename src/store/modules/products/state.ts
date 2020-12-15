import { Measures, Product } from '@/store/datatypes/models';

export default class ProductsState {
    editMode = false;

    selectedProduct: Product = {
        id: '',
        name: '',
        qtd: 0,
        minQtd: 0,
        measure: Measures.KG,
        image: '',
    };

    products: Product[] = [];
}
