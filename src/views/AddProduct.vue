<template>
    <div class="add-product">
        <div class="img-wrapper">
            <DNDImage
                id="img"
                :value="selectedProduct.image"
                :setValue="setProductImage"
            />
            <Button
                id="img-btn"
                name="img-btn"
                label="Escolha uma imagem"
                :onclick="() => {}"
            />
        </div>
        <div class="form">
            <form action="#">
                <InputWrapper label="Nome" legend="Product Name">
                    <TextInput
                        id="name"
                        :value="selectedProduct.name"
                        :setValue="setProductName"
                    />
                </InputWrapper>
                <InputWrapper label="Quantidade" legend="Product Quantity">
                    <Number
                        id="qtd"
                        type="number"
                        min="0"
                        :value="selectedProduct.qtd"
                        :setValue="setProductQtd"
                    />
                </InputWrapper>
                <InputWrapper label="Qtd (Min)" legend="Product Min Quantity">
                    <Number
                        id="min-qtd"
                        type="number"
                        min="0"
                        :value="selectedProduct.minQtd"
                        :setValue="setProductMinQtd"
                    />
                </InputWrapper>
                <InputWrapper
                    label="Product Measure"
                    legend="Product Measure"
                    for="measure"
                >
                    <select
                        name="measure"
                        id="measure"
                        :value="selectedProduct.measure"
                        @change="setProductMeasure($event.target.value)"
                    >
                        <option disabled>Escolha uma opção</option>
                        <option
                            v-for="(measure, index) in measures"
                            :key="index"
                            :selected="index == 0"
                            >{{ measure }}</option
                        >
                    </select>
                </InputWrapper>
                <div class="btn">
                    <Button
                        id="go-back"
                        name="voltar"
                        label="Voltar"
                        :onclick="routeToHomePage"
                    />
                    <Button
                        id="add-product"
                        name="add-product"
                        label="Enviar"
                        :onclick="submitForm"
                    />
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import InputWrapper from '@/components/InputWrapper.vue';
import TextInput from '@/components/TextInput.vue';
import Number from '@/components/Number.vue';
import Button from '@/components/Button.vue';
import DNDImage from '@/components/DNDImage.vue';

import { namespace } from 'vuex-class';

import { AddProductView } from '@/views/models.d';

import { Product, Measures, VuexAppModules } from '@/store/datatypes/models';

import {
    Mutations,
    MutationTypes,
    Actions,
    ActionTypes,
} from '@/store/modules/products';
import {
    Actions as AlertActions,
    ActionTypes as AlertActionTypes,
} from '@/store/modules/alert';

import { newProductError, newProductSuccess } from '@/assets/messages';

const products = namespace(VuexAppModules.products);
const alert = namespace(VuexAppModules.alert);

const { Mutation, Action, State } = products;

@Component({
    name: 'AddProduct',
    components: {
        InputWrapper,
        Number,
        TextInput,
        Button,
        DNDImage,
    },
    data: () => ({
        measures: Object.values(Measures),
    }),
})
export default class AddProduct extends Vue implements AddProductView {
    @State
    private selectedProduct!: Product;

    @Mutation
    private setProductName!: Mutations[MutationTypes.setProductName];

    @Mutation
    private setProductQtd!: Mutations[MutationTypes.setProductQtd];

    @Mutation
    private setProductMinQtd!: Mutations[MutationTypes.setProductMinQtd];

    @Mutation
    private setProductMeasure!: Mutations[MutationTypes.setProductMeasure];

    @Mutation
    private setProductImage!: Mutations[MutationTypes.setProductImage];

    @Action
    private newProduct!: Actions[ActionTypes.newProduct];

    @alert.Action
    private openAlert!: AlertActions[AlertActionTypes.openAlert];

    public submitForm() {
        try {
            this.newProduct(this.selectedProduct);
            this.openAlert(newProductSuccess);
        } catch (e) {
            this.openAlert(newProductError);
        }
    }

    public routeToHomePage() {
        this.$router.push('/products');
    }
}
</script>

<style scoped>
select > option,
select#measure {
    font-size: 16px;
}

.img-container {
    display: flex;
    margin-bottom: 5px;
    border: 1px solid var(--border-color);
    overflow: hidden;
}

.form {
    display: flex;
    flex-flow: row;
    width: 100%;
    margin-top: 10px;
    justify-content: space-around;
    align-self: center;
    align-content: center;
    align-items: center;
}
.form > form {
    display: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

form > fieldset {
    width: 70vw;
}

.add-product {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
}

.img-wrapper {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
}

select {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--border-color);
    font-family: inherit;
    font-size: inherit;
}

fieldset {
    padding: 0;
    display: flex;
    width: 100%;
    border: none;
}

label {
    width: 100%;
}
</style>
