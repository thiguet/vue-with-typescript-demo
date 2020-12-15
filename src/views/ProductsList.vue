<template>
    <div class="products-container">
        <div class="row">
            <ProductsTable
                :rows="tableRows"
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

import { ActionTypes, Actions } from '@/store/modules/products';

import { ProductsListView } from './models.d';

import { VuexAppModules } from '../store/datatypes/models';

const products = namespace(VuexAppModules.products);

const { Action, Getter } = products;

interface RowsData {
    name: string;
    icon?: string;
}

@Component({
    name: 'ProductsList',
    components: {
        Button,
        ProductsTable,
    },
})
export default class ProductsList extends Vue implements ProductsListView {
    @Getter
    private tableRows!: [];

    @Action
    private selectProduct!: Actions[ActionTypes.selectProduct];

    @Action
    private deleteProduct!: Actions[ActionTypes.deleteProduct];

    public routeToHomePage() {
        this.$router.push('/');
    }

    public routeToNewProductPage() {
        this.$router.push('/products/new');
    }

    public routeToEditProductPage(index: number) {
        this.$router.push('/products/edit');
        this.selectProduct(index);
    }

    public removeLine(index: number) {
        this.deleteProduct(index);
    }
}
</script>

<style>
.products-container {
    flex-direction: column;
}

.products-container .row {
    justify-content: flex-start;
}

.row {
    margin-top: 0px;
}

.row:nth-child(1) {
    min-height: 512px;
    overflow: auto;
}

.row:nth-child(2) {
    width: 100%;
    align-self: center;
    margin-top: 25px;
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

@media screen and (max-width: 600px) {
    .row:nth-child(1) {
        min-height: 520px;
    }
    .row:nth-child(2) {
        width: 100%;
        flex-direction: row;
        margin-top: 25px;
    }
}
</style>
