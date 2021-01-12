<template>
    <div id="reports">
        <div class="charts-wrapper">
            <ScalerBox v-if="!isLoading" box-title="Produtos por Peso %">
                <DonutChart :data="donutChartData" />
            </ScalerBox>

            <ScalerBox v-if="!isLoading" box-title="Produtos em Estoque">
                <LineChart :data="lineChartData" />
            </ScalerBox>
        </div>

        <Button
            id="go-back"
            name="voltar"
            label="Voltar"
            icon="./assets/icons/goback.svg"
            class="footer-btn goback"
            :onclick="routeToHomePage"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { namespace } from 'vuex-class';

import { ActionTypes, Actions } from '@/store/modules/reports';

import {
    MeasuresReport,
    QuantityReport,
    ReportData,
    VuexAppModules,
} from '@/store/datatypes/models';

import DonutChart from '@/components/DonutChart.vue';
import LineChart from '@/components/LineChart.vue';
import ScalerBox from '@/components/ScalerBox.vue';
import Button from '@/components/Button.vue';
import { ReportsView } from './models.d';

const reports = namespace(VuexAppModules.reports);

const { Action, State } = reports;

@Component({
    components: {
        Button,
        DonutChart,
        LineChart,
        ScalerBox,
    },
})
export default class Reports extends Vue implements ReportsView {
    @State
    private isLoading!: boolean;

    @State
    private measuresReport!: MeasuresReport;

    @State
    private quantityReport!: QuantityReport;

    @Action
    private fetchMeasuresReport!: Actions[ActionTypes.fetchMeasuresReport];

    @Action
    private fetchQuantityReport!: Actions[ActionTypes.fetchQuantityReport];

    created() {
        this.fetchReportData();
    }

    get donutChartData(): ReportData {
        return this.measuresReport.map((item) => ({
            text: item.measureName,
            value: +item.measureQuantity,
        }));
    }

    get lineChartData(): ReportData {
        return this.quantityReport.map((item) => ({
            text: item.productName,
            value: +item.productQuantity,
        }));
    }

    private fetchReportData() {
        this.fetchMeasuresReport();
        this.fetchQuantityReport();
    }

    routeToHomePage() {
        this.$router.push('/');
    }
}
</script>

<style scoped>
#reports {
    flex-flow: column;
}

.charts-wrapper {
    align-items: center;
    height: 85vh;
    flex-flow: row;
    justify-content: space-around;
}

.goback button {
    height: 60px;
    width: 150px;
    justify-content: center;
    display: flex;
}

@media screen and (max-width: 600px) {
    .charts-wrapper {
        flex-flow: column;
    }
}
</style>
