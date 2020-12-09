<template>
    <div class="products-container">
        <div class="row">
            <ProductsTable
                :rows="rows"
                @on-edit="routeToEditProductPage"
                @on-delete="removeLine"
            />
        </div>
        <div class="row">
            <Button
                id="go-back"
                name="voltar"
                label="Voltar"
                icon="./assets/icons/goback.svg"
                class="footer-btn"
                :onclick="routeToHomePage"
            />
            <Button
                id="add-product"
                name="Add Product"
                label="Add Product"
                icon="./assets/icons/add.svg"
                class="footer-btn"
                :onclick="routeToNewProductPage"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { namespace } from 'vuex-class';

import Button from '@/components/Button.vue';

import ProductsTable from '@/components/ProductsTable.vue';

import { ProductsListView } from './models.d';

import { Product, VuexAppModules } from '../store/datatypes/models';

const products = namespace(VuexAppModules.products);

const { Mutation, Action, State } = products;

interface RowsData {
    name: string;
    icon: string;
}

@Component({
    name: 'ProductsList',
    components: {
        Button,
        ProductsTable,
    },
    data() {
        return {
            rows: [],
        };
    },
})
export default class ProductsList extends Vue implements ProductsListView {
    private rows!: Array<RowsData>;

    @State
    private products: Product[];

    mounted() {
        this.rows = this.products.map((p: Product) => ({
            icon: p.image,
            name: p.name,
        }));
    }

    public routeToHomePage() {
        this.$router.push('/');
    }

    public routeToNewProductPage() {
        this.$router.push('/products/new');
    }

    public routeToEditProductPage() {
        this.$router.push('/products/edit');
    }

    public removeLine(index: number) {
        this.rows.splice(index, 1);
    }
}
</script>

<style>
.products-container {
    flex-direction: column;
}

.row:nth-child(1) {
    max-height: 440px;
    overflow: auto;
}

.row:nth-child(2) {
    margin-top: 40px;
    margin-bottom: 40px;
}

.footer-btn > button {
    padding: 5px 50px;
    height: 60px;
}
.footer-btn > button > img {
    display: flex;
    width: 50px;
    filter: contrast(0) brightness(55);
}
</style>
