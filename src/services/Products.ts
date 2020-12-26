import { Product } from '@/store/datatypes/models';

import VueWithTSAPI from './index';

export { VueWithTSAPI };

export async function getAllProducts(): Promise<Product[]> {
    return (await VueWithTSAPI.get('/products')).data as Product[];
}

export async function newProduct(product: Product): Promise<Product> {
    return (
        await VueWithTSAPI.post('/products', {
            product,
        })
    ).data as Product;
}

export async function editProduct(product: Product): Promise<Product> {
    return (
        await VueWithTSAPI.put(`/products/${product.id}`, {
            product,
        })
    ).data as Product;
}

export async function deleteProduct(product: Product): Promise<Product> {
    return (await VueWithTSAPI.delete(`/products/${product.id}`))
        .data as Product;
}
