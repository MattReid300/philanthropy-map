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
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)


// CHARTSSS

// const donutFunderType = {
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
                backgroundColor: ['#DC0000', '#960101', '#FF6363', '#D9D9D9'] // Add more if needed
            }
        ]
    }
})





// CHART SETTINGS

const donutOptions = {
    responsive: true,
    layout: {
        autoPadding: false
    },
    plugins: {
        legend: {
            position: 'right',
            display: true,
            fullSize: false,
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
        padding: 0
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


const barDataYear = computed(() => {
    // Initialize counts
    const counts = { '2023': 0, '2024': 0 };

    // Count occurrences
    mapStore.filteredLocations.forEach(location => {
        if (location.year === '2023' || location.year === '2024') {
            counts[location.year]++;
        }
    });

    return {
        labels: ['2023', '2024'],
        datasets: [
            {
                //label: 'Number of Locations',
                data: [counts['2023'], counts['2024']],
                backgroundColor: ['#DC0000', '#960101'],
            },
        ],
    };
});


const donutDataCountry = computed(() => {
    const countryCounts = {};

    mapStore.filteredLocations.forEach(location => {
        let country = location.country?.trim() || 'Unknown';
        country = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase(); // capitalize nicely

        countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    // Remove 'Unknown' from top candidates — we’ll handle it later
    const { Unknown = 0, ...knownCountries } = countryCounts;

    const sortedCountries = Object.entries(knownCountries)
        .sort((a, b) => b[1] - a[1]);

    // Top 3 known countries
    const top3 = sortedCountries.slice(0, 3);

    // Sum of remaining known countries
    const otherKnownCount = sortedCountries
        .slice(3)
        .reduce((sum, [, count]) => sum + count, 0);

    // Add any unknowns to 'Other'
    const otherCount = otherKnownCount + Unknown;

    const labels = top3.map(([country]) => country);
    const data = top3.map(([, count]) => count);

    if (otherCount > 0) {
        labels.push('Other');
        data.push(otherCount);
    }

    return {
        labels,
        datasets: [
            {
                //label: 'Locations by Country',
                data,
                backgroundColor: ['#DC0000', '#960101', '#FF6363', '#D9D9D9']
            },
        ],
    };
});


const donutDataFundingType = computed(() => {
    const fundingModelCounts = {};

    mapStore.filteredLocations.forEach(location => {
        let fundingModel = location.fundingmodel?.trim();

        if (!fundingModel) {
            fundingModel = 'Unknown';
        } else {
            // normalize casing nicely
            fundingModel =
                fundingModel.charAt(0).toUpperCase() +
                fundingModel.slice(1).toLowerCase();
        }

        fundingModelCounts[fundingModel] = (fundingModelCounts[fundingModel] || 0) + 1;
    });

    // Separate Unknown so it doesn't appear in the top 3
    const { Unknown = 0, ...knownFundingModels } = fundingModelCounts;

    const sortedFundingModels = Object.entries(knownFundingModels)
        .sort((a, b) => b[1] - a[1]);

    // Top 3 known funding models
    const top3 = sortedFundingModels.slice(0, 3);

    // Sum of remaining known funding models
    const otherKnownCount = sortedFundingModels
        .slice(3)
        .reduce((sum, [, count]) => sum + count, 0);

    // Add any unknowns to 'Other'
    const otherCount = otherKnownCount + Unknown;

    const labels = top3.map(([fundingModel]) => fundingModel);
    const data = top3.map(([, count]) => count);

    if (otherCount > 0) {
        labels.push('Other');
        data.push(otherCount);
    }

    return {
        labels,
        datasets: [
            {
                //label: 'Locations by Funding Model',
                data,
                backgroundColor: ['#DC0000', '#960101', '#FF6363', '#D9D9D9']
            },
        ],
    };
});

</script>

<template>
    <!-- <v-row no-gutters class="dashboard-container text-left px-0">
        <v-col cols="3" class="donut-wrapper">
            <Bar :data="barDataYear" :options="barOptions" />
        </v-col>
        <v-col cols="3" class="donut-wrapper">
            <Doughnut :data="donutDataCountry" :options="donutOptions" />
        </v-col>
        <v-col cols="3" class="donut-wrapper">
            <Doughnut :data="donutDataFundingType" :options="donutOptions" />
        </v-col>
        <v-col cols="3" class="donut-wrapper">
            <Doughnut :data="donutImpactArea" :options="donutOptions" />
        </v-col>
    </v-row> -->
    <div class="dashboard-container d-flex flex-row justify-space-around">
        <div class="bar">
            <Bar :data="barDataYear" :options="barOptions" />
        </div>
        <div class="doughnut">
            <Doughnut :data="donutDataCountry" :options="donutOptions" />
        </div>
        <div class="doughnut">
            <Doughnut :data="donutDataFundingType" :options="donutOptions" />
        </div>
        <div class="doughnut">
            <Doughnut :data="donutImpactArea" :options="donutOptions" />
        </div>
    </div>
</template>

<style scoped>
.dashboard-container {
    /* margin-top: -100px; */
    height: 25vh;
    overflow-y: hidden;
}

.doughnut {
    /* flex: 1 1 0; */
    min-width: 0;
    height: 280px;
    margin-top: -3rem;
    justify-content: center;
    text-align: center;
    /* margin-bottom: -0.5rem; */
}

.bar {
    margin-top: 20px;
}

.donut-wrapper {
    /* width: 400px; */
    height: 25vh;
    display: flex;
    justify-content: center;
}
</style>