<script setup>
import { Doughnut } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title, Tooltip, Legend,
    ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const donutData = {
    labels: ['A', 'B', 'C'],
    datasets: [
        {
            data: [40, 30, 30],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
    ]
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right'
        },
        title: {
            display: false,
            text: 'Sample Chart'
        }
    }
}
</script>

<template>
    <div class="dashboard-container text-left px-8 d-flex justify-space-between">
        <div class="donut-wrapper">
            <Doughnut :data="donutData" :options="options" />
        </div>
        <div class="donut-wrapper">
            <Doughnut :data="donutData" :options="options" />
        </div>
        <div class="donut-wrapper">
            <Doughnut :data="donutData" :options="options" />
        </div>
        <div class="donut-wrapper">
            <Doughnut :data="donutData" :options="options" />
        </div>
    </div>
</template>

<style scoped>
.dashboard-container {
    height: 100%;
}

.donut-wrapper {
    width: 400px;
    height: 180px;
    display: flex;
    justify-content: center;
}
</style>