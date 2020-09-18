import { Product } from '@/store/datatypes/models';

export default class ProductsState {
    selectedProduct!: Product;

    products: Product[] = [];
}
