<template>
    <div class="add-product">
        <div class="img-wrapper">
            <div class="img-container">
                <span>Img:</span>
                <img id="img" />
            </div>
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
                        :value="ProductName"
                        :setValue="ProductName"
                    />
                </InputWrapper>
                <InputWrapper label="Quantidade" legend="Product Quantity">
                    <TextInput
                        id="qtd"
                        type="number"
                        :value="ProductQtd"
                        :setValue="ProductQtd"
                    />
                </InputWrapper>
                <InputWrapper label="Qtd (Min)" legend="Product Min Quantity">
                    <TextInput
                        id="minQtd"
                        type="number"
                        :value="ProductMinQtd"
                        :setValue="ProductMinQtd"
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
                        @change="Measure($event.target.value)"
                    >
                        <option selected disabled>Escolha uma opção</option>
                        <option
                            v-for="(measure, index) in measures"
                            :key="index"
                        >
                            {{ measure }}
                        </option>
                    </select>
                </InputWrapper>
                <Button
                    id="add-product"
                    name="add-product"
                    label="Enviar"
                    :onclick="() => {}"
                />
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import InputWrapper from '@/components/InputWrapper.vue';
import TextInput from '@/components/TextInput.vue';
import Button from '@/components/Button.vue';

import { namespace } from 'vuex-class';

import { AddProductView } from '@/views/models.d';

import { Product, Measures, VuexAppModules } from '@/store/datatypes/models';

import Mutations, { MutationTypes } from '@/store/modules/products/mutations';

const products = namespace(VuexAppModules.products);

@Component({
    name: 'AddProduct',
    components: {
        InputWrapper,
        TextInput,
        Button,
    },
    data: () => ({
        measures: Object.values(Measures),
    }),
})
export default class AddProduct extends Vue implements AddProductView {
    @products.State
    private selectedProduct!: Product;

    @products.Mutation
    setProduct!: Mutations[MutationTypes.setProduct];

    get ProductName() {
        return ''; // this.selectedProduct.name;
    }

    set ProductName(val: string) {
        this.setProduct({
            ...this.selectedProduct,
            name: val,
        });
    }

    get Measure() {
        return this.selectedProduct.measure;
    }

    set Measure(val: keyof typeof Measures) {
        this.setProduct({
            ...this.selectedProduct,
            measure: val,
        });
    }

    public newProduct() {
        console.log('a');
    }

    public setMeasure() {
        this.setProduct({
            ...this.selectedProduct,
            // measure: value,
        });
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
    padding: 50px 30vw;
    margin-bottom: 5px;
    border: 1px solid var(--border-color);
}

.form {
    display: flex;
    flex-flow: row;
    width: 100%;
    justify-content: space-around;
    align-self: center;
    align-content: center;
    align-items: center;
}
.form > form {
    display: relative;
    width: 100%;
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
