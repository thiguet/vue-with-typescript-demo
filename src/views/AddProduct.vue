<template>
  
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';

import { namespace } from 'vuex-class';
import { LoginView } from '@/views/models.d';
import { AddProductView } from '@/views/models.d';

const login = namespace('login');

@Component({
  name: 'Login',
  components: {
    Input,
    Button,
  },
})
export default class AddProduct extends Vue implements AddProductView {
}
</script>

<style>

</style>