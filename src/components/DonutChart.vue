<template>
    <svg
        id="donut-chart"
        :height="height"
        :width="width"
        class="donut-chart chart"
        v-if="data && data.length"
    >
        <g v-for="(value, index) in sortedValues" :key="index">
            <circle
                :cx="cx"
                :cy="cy"
                :r="radius"
                :stroke="randomColor()"
                :stroke-width="strokeWidth"
                :stroke-dasharray="adjustedCircumference"
                :stroke-dashoffset="
                    calculateStrokeDashOffset(value, circumference)
                "
                fill="transparent"
                :transform="returnCircleTransformValue(index)"
            />

            <text
                v-if="segmentBigEnough(value)"
                text-anchor="middle"
                dy="3px"
                :x="chartData[index].textX"
                :y="chartData[index].textY"
            >
                {{ data[index].text }}
            </text>
            <text
                v-if="segmentBigEnough(value)"
                text-anchor="middle"
                dy="16px"
                :x="chartData[index].textX"
                :y="chartData[index].textY"
            >
                {{ percentageString(value) }}
            </text>
        </g>
    </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ReportData } from '@/store/datatypes/models';

interface DonutChartItem {
    degrees: number;
    textX: number;
    textY: number;
}

@Component
export default class DonutChart extends Vue {
    @Prop() readonly data!: ReportData;

    private angleOffset = 0;

    private readonly width = 140;

    private readonly height = 140;

    private readonly cx = this.width / 2;

    private readonly cy = this.height / 2;

    private readonly radius = (Math.min(this.cx, this.cy) * 4) / 5;

    private strokeWidth = Math.min(this.cx, this.cy) / 3;

    randomColor() {
        return `hsla(${Math.random() * 360}, 80%, 70%, 1)`;
    }

    get chartData(): Array<DonutChartItem> {
        return this.sortedValues.map((dataVal) => {
            const { x, y } = this.calculateTextCoords(
                dataVal,
                this.angleOffset,
            );

            const data = {
                degrees: this.angleOffset,
                textX: x,
                textY: y,
            };

            this.angleOffset += this.dataPercentage(dataVal) * 360;

            return data;
        });
    }

    get adjustedCircumference() {
        return this.circumference;
    }

    get circumference() {
        return 2 * Math.PI * this.radius;
    }

    get dataTotal() {
        return this.sortedValues.reduce((acc, next) => acc + next, 0);
    }

    get sortedValues(): Array<number> {
        return this.data.map((d) => d.value).sort((a, b) => b - a);
    }

    calculateStrokeDashOffset(dataVal: number, circumference: number) {
        const strokeDiff = this.dataPercentage(dataVal) * circumference;
        return circumference - strokeDiff;
    }

    calculateTextCoords(dataVal: number, angleOffset: number) {
        const angle = (this.dataPercentage(dataVal) * 360) / 2 + angleOffset;
        const radians = this.degreesToRadians(angle);

        const textCoords = {
            x: this.radius * Math.cos(radians) + this.cx,
            y: this.radius * Math.sin(radians) + this.cy,
        };
        return textCoords;
    }

    degreesToRadians(angle: number) {
        return angle * (Math.PI / 180);
    }

    dataPercentage(dataVal: number) {
        return dataVal / this.dataTotal;
    }

    percentageString(dataVal: number) {
        return `${Math.round(this.dataPercentage(dataVal) * 100)}% `;
    }

    returnCircleTransformValue(index: number) {
        return `rotate(${this.chartData[index].degrees}, ${this.cx}, ${this.cy})`;
    }

    segmentBigEnough(dataVal: number) {
        return Math.round(this.dataPercentage(dataVal) * 100) > 5;
    }
}
</script>
<style scoped>
div#donut-chart {
    justify-content: center;
}

svg.donut-chart {
    overflow: visible;
    filter: none;
}

text {
    fill: #333;
    font-family: 'Roboto', sans-serif;
    font-size: 0.75rem;
}

svg.donut-chart g .hoverText {
    display: none;
}

svg.donut-chart g:hover .hoverText {
    display: block;
}
</style>
