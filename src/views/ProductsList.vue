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

import Button from '@/components/Button.vue';

import ProductsTable from '@/components/ProductsTable.vue';

import { ProductsListView } from './models.d';

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
            rows: [
                {
                    name: 'test 1',
                    icon: './assets/icons/statistics.svg',
                },
                {
                    name: 'test 2',
                    icon: './assets/icons/statistics.svg',
                },
                {
                    name: 'test 3',
                    icon: './assets/icons/statistics.svg',
                },
                {
                    name: 'test 4',
                    icon: './assets/icons/statistics.svg',
                },
                {
                    name: 'test 5',
                    icon: './assets/icons/statistics.svg',
                },
            ],
        };
    },
})
export default class ProductsList extends Vue implements ProductsListView {
    private rows!: Array<RowsData>;

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

.row:nth-child(2) {
    margin-top: 40px;
    margin-bottom: 40px;
}

.footer-btn > button {
    padding: 5px 50px;
}
.footer-btn > button > img {
    display: flex;
    width: 50px;
}
</style>
