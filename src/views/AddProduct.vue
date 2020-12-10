<template>
    <div class="add-product">
        <div class="img-wrapper">
            <DNDImage
                id="img"
                :value="selectedProduct.image"
                :setValue="setProductImage"
                @change="handleImgFileChange"
            />
            <Button
                id="img-btn"
                name="img-btn"
                label="Escolha uma imagem"
                :onclick="chooseAnImageHandler"
            />
            <input
                id="file-input"
                type="file"
                ref="files"
                style="display:none;"
                @change="handleFileChange"
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
                <div class="btn" style="img.icon {width: 40px; }">
                    <Button
                        id="go-back"
                        class="footer-button"
                        icon="../assets/icons/goback.svg"
                        name="voltar"
                        label="Voltar"
                        :onclick="routeToHomePage"
                    />
                    <Button
                        id="add-product"
                        class="footer-button"
                        icon="../assets/icons/check.svg"
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
import { Vue, Component, Ref } from 'vue-property-decorator';

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
    @Ref()
    private files!: FileList;

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

    public chooseAnImageHandler() {
        const fileInputComp = document.getElementById('file-input');

        if (fileInputComp !== null) {
            fileInputComp.click();
        }
    }

    public routeToHomePage() {
        this.$router.push('/products');
    }

    public setImage(file: File) {
        this.setProductImage(file);
    }

    public handleFileChange() {
        this.setImage(this.files[0]);
    }

    public handleImgFileChange(files: File[]) {
        this.setImage(files[0]);
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
    justify-content: space-around;
    flex-direction: row;
    width: 70%;
}

.img-wrapper .wrapper-btn {
    width: auto;
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

<style>
.footer-button .icon {
    width: 50px;
    align-self: center;
    filter: contrast(0) brightness(55);
}
.footer-button button {
    height: 60px;
    padding: 0;
    width: 150px;
    display: flex;
    justify-content: center;
}

.label span {
    cursor: text;
    font-size: 13px;
    font-weight: bold;
}

select {
    cursor: pointer;
}
</style>
