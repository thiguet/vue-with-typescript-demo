import { Product } from '@/store/datatypes/models.d';

export default class ProductsState {
  selectedProduct!: Product;

  products: Product[] = [];
}
