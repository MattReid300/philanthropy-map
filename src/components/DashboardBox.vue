<script setup>
import { Doughnut } from 'vue-chartjs'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title, Tooltip, Legend,
    ArcElement, BarElement, CategoryScale, LinearScale
} from 'chart.js'
import { computed } from 'vue'
import { useDataStore } from '../stores/mapStore';
const mapStore = useDataStore();

// CHARTSSS
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)
const donutFunderType = {
    labels: ['A', 'B', 'C'],
    datasets: [
        {
            data: [40, 30, 30],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
    ]
}
// const donutImpactArea = {
//     labels: ['A', 'B', 'C'],
//     datasets: [
//         {
//             data: [40, 30, 30],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
//         }
//     ]
// }
const donutImpactArea = computed(() => {
    const dataObj = impactAreaCategoryCounts.value

    return {
        labels: Object.keys(dataObj),
        datasets: [
            {
                data: Object.values(dataObj),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#A1DE93'] // Add more if needed
            }
        ]
    }
})
const barDataYear = {
    labels: ['2022', '2023', '2024'],
    datasets: [
        {
            label: 'Year',
            data: [100, 200, 150, 300],
            borderColor: '#42b983',
            fill: false
        }
    ]
}
const barDataGeography = {
    labels: ['country', 'country', 'country'],
    datasets: [
        {
            label: 'Geo',
            data: [100, 200, 150, 300],
            borderColor: '#42b983',
            fill: false
        }
    ]
}
const donutOptions = {
    responsive: true,
    layout: {
        autoPadding: false,
        // padding: {
        //     top: 50,
        //     left: 50,
        //     right: 0
        // }
    },
    plugins: {
        legend: {
            position: 'right',
            display: true,
            fullSize: true
        },
        title: {
            display: false,
            text: 'Sample Chart'
        }
    }
}

const barOptions = {
    responsive: true,
    layout: {
        autoPadding: false,
        padding: 20
        // padding: {
        //     top: 50,
        //     left: 50,
        //     right: 0
        // }
    },
    plugins: {
        legend: {
            position: 'right',
            display: false,
            fullSize: true
        },
        title: {
            display: false,
            text: 'Sample Chart'
        }
    }
}

// POPULATING OF CHARTS
const impactAreaCategoryCounts = computed(() => {
    const counts = {}
    const subcategoryToCategoryMap = {}

    // Build subcategory-to-category map
    for (const [category, subcategories] of Object.entries(mapStore.impactAreaCategories)) {
        subcategories.forEach(subcat => {
            subcategoryToCategoryMap[subcat] = category
        })
    }

    // Initialize counts
    Object.keys(mapStore.impactAreaCategories).forEach(category => {
        counts[category] = 0
    })

    // Count how many filteredLocations fall into each category
    mapStore.filteredLocations.forEach(location => {
        const subcategory = location.impactarea
        const parentCategory = subcategoryToCategoryMap[subcategory]
        if (parentCategory) {
            counts[parentCategory]++
        }
    })

    // Convert counts to array and sort by count descending
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])

    // Top 3 categories
    const topThree = sorted.slice(0, 3)

    // Sum of the rest
    const otherCount = sorted.slice(3).reduce((sum, [, count]) => sum + count, 0)

    // Return as object
    const result = Object.fromEntries(topThree)
    if (otherCount > 0) {
        result["Other"] = otherCount
    }

    return result
})






</script>

<template>
    <v-row no-gutters class="dashboard-container text-left px-8">
        <v-col cols="3" class="donut-wrapper">
            <Bar :data="barDataYear" :options="barOptions" />
        </v-col>
        <v-col cols="3" class="donut-wrapper">
             <Bar :data="barDataGeography" :options="barOptions" />
        </v-col>
        <v-col cols="3" class="donut-wrapper">
            <Doughnut :data="donutFunderType" :options="donutOptions" />
        </v-col>
        <v-col cols="3" class="donut-wrapper">
            <Doughnut :data="donutImpactArea" :options="donutOptions" />
        </v-col>


        <!-- <div class="donut-wrapper">
            <Bar :data="barDataGeography" :options="options" />
        </div>
        <div class="donut-wrapper">
            <Doughnut :data="donutFunderType" :options="options" />
        </div>
        <div class="donut-wrapper" style="height: 220px;">
            <Doughnut :data="donutImpactArea" :options="options" />
        </div> -->
    </v-row>
</template>

<style scoped>
.dashboard-container {
    /* margin-top: -100px; */
    height: 25vh;
    overflow-y: hidden;
}

.donut-wrapper {
    /* width: 400px; */
    height: 25vh;
    display: flex;
    justify-content: center;
}
</style>