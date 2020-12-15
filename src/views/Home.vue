<template>
    <div class="home">
        <div class="row">
            <Card
                :onclick="routeToProducts"
                icon="./assets/icons/supermarket-car.svg"
            >
            </Card>
            <Card
                :onclick="routeToReports"
                icon="./assets/icons/statistics.svg"
            >
            </Card>
        </div>
        <div class="row btn-row">
            <Button
                id="goback"
                class="goback"
                icon="./assets/icons/goback.svg"
                name="voltar"
                label="Voltar"
                :onclick="routeToLogin"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';

import { HomeView } from './models.d';

@Component({
    name: 'Home',
    components: {
        Card,
        Button,
    },
})
export default class Home extends Vue implements HomeView {
    public routeToProducts() {
        this.$router.push('/products');
    }

    public routeToReports() {
        this.$router.push('/reports');
    }

    public routeToLogin() {
        this.$router.push('/login');
    }
}
</script>

<style>
.home {
    flex-direction: column;
}
.btn-row {
    margin-top: 0px;
    align-self: center;
    max-width: 200px;
}

.row:nth-child(1) {
    min-height: 512px;
    overflow: auto;
}

.row:nth-child(2) {
    width: 100%;
    align-self: center;
}

.row {
    margin-top: 20px;
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

    .row:nth-child(2) {
        margin-top: 40px;
    }
}

.goback {
    margin: auto;
}

.goback button {
    height: 60px;
    width: 150px;
    justify-content: center;
    display: flex;
}

.goback > button > .icon {
    align-self: center;
    width: 60px !important;
    filter: contrast(0) brightness(88);
}
</style>
