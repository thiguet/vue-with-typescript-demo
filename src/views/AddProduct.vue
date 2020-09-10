<template>
  <div class="add-product">
    <div class="img-container">
      <img id="img" />
    </div>
    <div class="form">
      <form action="#">
        <Button id="img-btn" 
                label="Escolha uma imagem"
                :onclick="() => {}" />
        <Input id="name"
              label="Nome"
              legend="Product Name"
              value=""
              :setValue="setName" />
        <Input id="qtd"
              label="Quantidade"
              legend="Product Quantity"
              value=""
              :setValue="setQtd" />
        <Input id="minQtd"
              label="Quantidade (Min)"
              legend="Product Minimun Quantity"
              value=""
              :setValue="setMinQtd" />
        <Input id="measure"
              label="Un. Medida"
              legend="Product Measure"
              value=""
              :setValue="setMeasure" />
        <Button id="submit"
                label="Enviar"
                :onclick="() => {}"/>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';

import { namespace } from 'vuex-class';

import { AddProductView } from '@/views/models.d';

import { Product } from '@/store/datatypes/models.d';

const products = namespace('products');

@Component({
  name: 'AddProduct',
  components: {
    Input,
    Button,
  },
})
export default class AddProduct extends Vue implements AddProductView {
  @products.State
  private selectedProduct!: Product;
}
</script>

<style>
</style>
