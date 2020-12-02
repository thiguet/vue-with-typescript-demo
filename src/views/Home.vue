<template>
  <div class="home">
    <div class="row">
      <Card :onclick="() => {}" icon="./assets/icons/supermarket-car.svg">
      </Card>
      <Card :onclick="() => {}" icon="./assets/icons/statistics.svg">
      </Card>
    </div>
    <div class="row btn-row">
      <Button id="goback" name="voltar" label="Voltar" onclick=""  />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import Button from '@/components/Button';

export default {
    name: 'Home',
    components: {
        Card,
        Button,
    },
};
</script>

<style scoped>
.home {
    flex-direction: column;
}

.btn-row {
    margin-top: 40px;
    align-self: center;
    max-width: 200px;
}
.row {
    justify-content: space-around;
}

@media screen and (max-width: 600px) {
    .row {
        flex-direction: column;
        justify-content: center;
    }
    .row .container:nth-child(2) {
      margin-top: 10px;
    }
}

</style>
