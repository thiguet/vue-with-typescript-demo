<template>
    <donut-chart :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DonutChart from '@/components/DonutChart.vue';

@Component({
    components: {
        DonutChart,
    },
    data() {
        return {
            chartOptions: {
                hoverBorderWidth: 20,
            },
            chartData: {
                hoverBackgroundColor: 'red',
                hoverBorderWidth: 10,
                labels: ['Green', 'Red', 'Blue'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
                        data: [1, 10, 5],
                    },
                ],
            },
        };
    },
})
export default class Reports extends Vue {}
</script>

<style>
#app {
    background: green;
}
</style>
