<template>
  <div class="add-product">
    <div class="img-wrapper">
      <div class="img-container">
        <span>Img:</span>
        <img id="img" />
      </div>
      <Button id="img-btn"
              label="Escolha uma imagem"
              :onclick="() => {}" />
    </div>
    <div class="form">
      <form action="#">
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

<style scoped>
.img-container {
  display: flex;
  padding:  50px 30vw;
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

.add-product {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}

.img-wrapper {
  flex-direction: column;
  width: 100%;
}
</style>
