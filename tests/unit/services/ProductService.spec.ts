import {
    VueWithTSAPI,
    newProduct,
    editProduct,
    deleteProduct,
    getAllProducts,
} from '@/services/Products';
import { Product } from '@/store/datatypes/models';
import { getFakeProduct } from '../utils/ProductFactory';

describe('Product Service API', () => {
    let product: Product;

    beforeEach(() => {
        product = getFakeProduct();
    });

    it('must save a new product', async () => {
        jest.spyOn(VueWithTSAPI, 'post').mockResolvedValue({
            data: product,
        });

        const result = await newProduct(product);

        expect(VueWithTSAPI.post).toBeCalledWith('/products', {
            product,
        });
        expect(result).toEqual(product);
    });

    it('must edit a product', async () => {
        jest.spyOn(VueWithTSAPI, 'put').mockResolvedValue({
            data: product,
        });

        const result = await editProduct(product);

        expect(VueWithTSAPI.put).toBeCalledWith(`/products/${product.id}`, {
            product,
        });
        expect(result).toEqual(product);
    });

    it('must delete a product', async () => {
        jest.spyOn(VueWithTSAPI, 'delete').mockResolvedValue({ data: product });

        const result = await deleteProduct(product);

        expect(VueWithTSAPI.delete).toBeCalledWith(`/products/${product.id}`);
        expect(result).toEqual(product);
    });

    it('must get all saved products', async () => {
        const allProducts = Array(50)
            .fill(null)
            .map(getFakeProduct);

        jest.spyOn(VueWithTSAPI, 'get').mockResolvedValue({
            data: allProducts,
        });

        const result = await getAllProducts();

        expect(VueWithTSAPI.get).toBeCalledWith('/products');
        expect(result).toEqual(allProducts);
    });
});
