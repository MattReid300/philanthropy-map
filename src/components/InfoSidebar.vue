<script setup>
import { useDataStore } from '../stores/mapStore';
import { computed } from 'vue';

const mapStore = useDataStore();

const formattedGrantAmount = computed(() => {
    return (amount) => new Intl.NumberFormat('en-US').format(amount);
})

// const matchingLocations = computed(() => {
//     // If no place is selected, return empty array
//     if (!mapStore.selectedPlace) return [];

//     return mapStore.locations.filter(loc =>
//         loc.latitude === mapStore.selectedPlace.latitude &&
//         loc.longitude === mapStore.selectedPlace.longitude
//     );
// });
</script>

<template>
    <div class="info-container">
        <div class="sidebar">
            <h2 style="font-size: 2.5rem;" class="mb-2">Impact</h2>
            <div class="info-box h-100" v-if="mapStore.selectedPlace">
                <div v-if="mapStore.matchingLocations.length == 1">
                    <div class="d-flex flex-row justify-space-between align-center">
                        <div>
                            <h2>{{ mapStore.selectedPlace?.projectname }}</h2>
                        </div>
                    </div>
                    <div class="info-box-content">
                        <p>Funded by <span class="font-weight-bold">{{ mapStore.selectedPlace?.fundingorganisation
                                }}</span></p>
                        <p class="my-2"><span class="font-weight-medium"></span>{{ mapStore.selectedPlace.impact }}</p>
                        <div class="d-flex flex-row align-center">
                            <v-icon icon="mdi-puzzle-outline" class="mr-1"></v-icon>
                            <p><span class="font-weight-medium">Impact Area: </span>{{ mapStore.selectedPlace.impactarea
                            }}
                            </p>
                        </div>
                        <div class="d-flex flex-row align-center">
                            <v-icon icon="mdi-cash-check" class="mr-1"></v-icon>
                            <p><span class="font-weight-medium">Amount Approved: </span>€{{
                                formattedGrantAmount(mapStore.selectedPlace.grantamount) }}
                            </p>
                        </div>
                        <div class="d-flex flex-row align-center">
                            <v-icon icon="mdi-calendar" class="mr-1"></v-icon>
                            <p><span class="font-weight-medium">Year Funded: </span>{{ mapStore.selectedPlace.year }}
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else-if="mapStore.matchingLocations.length > 1" class="h-100">
                    <div class="d-flex flex-row justify-space-between align-center pb-2">
                        <div>
                            <h2>{{ mapStore.selectedPlace?.projectname }}</h2>
                        </div>
                    </div>
                    <div style="overflow-y: auto; height: 100%;">
                        <div v-for="location in mapStore.matchingLocations" :key="location.id" class="mb-6">
                            <p>Funded by <span class="font-weight-bold">{{ location.fundingorganisation }}</span></p>
                            <p class="my-2"><span class="font-weight-medium"></span>{{ location.impact }}</p>
                            <div class="d-flex flex-row align-center">
                                <v-icon icon="mdi-puzzle-outline" class="mr-1"></v-icon>
                                <p><span class="font-weight-medium">Impact Area: </span>{{ location.impactarea
                                    }}
                                </p>
                            </div>
                            <div class="d-flex flex-row align-center">
                                <v-icon icon="mdi-cash-check" class="mr-1"></v-icon>
                                <p><span class="font-weight-medium">Amount Approved: </span>€{{
                                    formattedGrantAmount(location.grantamount) }}
                                </p>
                            </div>
                            <div class="d-flex flex-row align-center">
                                <v-icon icon="mdi-calendar" class="mr-1"></v-icon>
                                <p><span class="font-weight-medium">Year Funded: </span>{{ location.year }}
                                </p>
                            </div>
                            <v-divider class="mt-2 border-opacity-100" color="darkgrey"></v-divider>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-center h-100 d-flex align-center">
                <p class="text-darkgrey" style="font-size: 20px;">Select a Marker on the Map to See Relevant Data
                </p>
            </div>

        </div>
    </div>
</template>

<style scoped>
.info-container {
    /* compensate for scale shrink */
    width: 300px;
    /* 400px × 0.85 */
    height: 100%;
    overflow: hidden;
    height: 75vh;
}

.sidebar {
    box-sizing: border-box;
    text-align: left;
    width: 400px;
    height: 80vh;
    background-color: #ffffff;
    /* box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2); */
    z-index: 20;
    padding: 0 15px 0;
    margin: 0;
    /* overflow-y: auto; */
    transform: scale(0.75);
    transform-origin: top left;
}
</style>