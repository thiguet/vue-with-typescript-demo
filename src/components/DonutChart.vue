<template>
    <canvas id="doughnut" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Doughnut } from 'vue-chartjs';

const getDefaultValue = () => [];

@Component
export default class DonutChart extends Doughnut {
    @Prop({ default: getDefaultValue }) readonly options!: [];

    @Prop({ default: getDefaultValue }) readonly data!: any;

    mounted() {
        this.renderChart(this.data);
    }
}
</script>
