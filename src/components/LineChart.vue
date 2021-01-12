<template>
    <svg
        id="line-chart"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        class="chart"
        :height="fullHeight"
        :width="fullWidth"
        aria-labelledby="title"
        role="img"
        v-if="data && data.length"
    >
        <title id="title">A bar chart showing information</title>
        <g
            v-for="(item, index) in sortedData"
            :key="index"
            class="bar"
            :transform="`translate(${textSize + 10}, -${textSize})`"
        >
            <rect
                :width="barWidth / 3"
                :height="getRectHeight(item.value)"
                :x="`${index * barWidth} `"
                :y="barsSize + textSize - getRectHeight(item.value)"
            ></rect>
        </g>
        <g class="x axis" :transform="`translate(${textSize},${barsSize})`">
            <g
                v-for="(item, index) in data"
                :key="index"
                class="tick"
                :transform="`translate(${barWidth * index + 12},0)`"
                style="opacity: 1;"
            >
                <text
                    dy=".71em"
                    y="9"
                    x="0"
                    style="text-anchor: middle; transform: rotate(-20deg);"
                >
                    {{ item.text }}
                </text>
                <text
                    dy=".71em"
                    :y="10 - textSize - getRectHeight(item.value)"
                    x="5"
                    style="text-anchor: middle;"
                >
                    {{ item.value }}
                </text>
            </g>
            <path class="domain" :d="`M0,1V0H${barsSize}V1`"></path>
            <text
                y="6"
                :x="fullWidth - textSize"
                dy=".71em"
                style="text-anchor: end;"
            ></text>
        </g>
        <g class="y axis" :transform="`translate(${textSize}, 0)`">
            <g
                v-for="index in data.length"
                :key="index"
                class="tick"
                :transform="`translate(0,${(barsSize / data.length) * index})`"
                style="opacity: 1;"
            >
                <line x2="-1" y2="0"></line>
                <text dy=".32em" x="-2" y="0" style="text-anchor: end;">
                    {{
                        `${Math.floor(100 / data.length) *
                            (data.length - index)}`
                    }}
                </text>
            </g>
            <path
                class="domain"
                :d="`M-1,0H0V${barsSize}H-1`"
                transform="translate(0, 1)"
            ></path>
            <text y="0" x="-2" dy=".71em" style="text-anchor: end;">
                %
            </text>
        </g>
    </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ReportData } from '@/store/datatypes/models';

@Component
export default class LineChart extends Vue {
    @Prop({ required: true }) private data!: ReportData;

    private barsSize = 140;

    private textSize = 20;

    get fullWidth() {
        return this.barWidth * this.data.length + this.textSize;
    }

    get fullHeight() {
        return this.barsSize + this.textSize;
    }

    get barWidth() {
        return this.barsSize / this.data.length;
    }

    get sortedData() {
        return this.data.sort((a, b) => a.value - b.value);
    }

    get total() {
        return this.data.reduce((acc, next) => acc + next.value, 0);
    }

    get desvioPadrao() {
        const arr = this.data;
        const mean: number =
            arr.reduce((acc, next) => acc + next.value, 0) / arr.length;
        return Math.sqrt(
            arr.reduce((acc, next) => acc + (next.value - mean) ** 2, 0) /
                arr.length,
        );
    }

    getRectHeight(percentage: number) {
        return (
            (((percentage * 100) / this.total) * this.barsSize) / 100 +
            (this.desvioPadrao < 15 ? (percentage * 100) / this.total : 0)
        );
    }
}
</script>

<style>
.chart {
    font-size: 10px;
    display: inline-block;
    margin-right: 0;
    filter: none;
    transition: all 0.3s ease;
}

.box {
    padding: 20px;
    cursor: pointer;
}

.bar {
    position: relative;
    fill: #aaa;
    transition: fill 0.3s ease;
    cursor: pointer;
    font-family: Helvetica, sans-serif;
    display: inline-block;
}

.chart:hover .bar,
.chart:focus .bar {
    fill: #aaa;
}

.bar:hover rect,
.bar:focus rect {
    fill: var(--forth-bg);
}

.bar:hover text,
.bar:focus text {
    fill: var(--forth-bg);
}

.bar rect {
    fill: green;
}

.bar text {
    fill: black;
}

.bar text,
.bar text {
    transform: rotate(90deg);
}
</style>
