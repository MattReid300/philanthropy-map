<script setup>
import { useDataStore } from '../stores/mapStore';
import { computed } from 'vue';

const mapStore = useDataStore();

const formattedGrantAmount = computed(() => {
    return new Intl.NumberFormat('en-US').format(mapStore.selectedPlace.grantamount);
})
</script>

<template>
    <div class="info-container">
        <div class="sidebar">
            <!-- <v-row no-gutters>
                <v-col cols="12" class="my-3"> -->
                    <h2 style="font-size: 2.5rem;" class="mb-4">Impact</h2>
                    <div class="info-box h-100" v-if="mapStore.selectedPlace">
                        <div class="d-flex flex-row justify-space-between align-center">
                            <div>
                                <h2>{{ mapStore.selectedPlace?.projectname }}</h2>
                            </div>
                        </div>
                        <div class="info-box-content">
                            <p>Funded by <a href="" class="text-decoration-underline text-primary">{{
                                mapStore.selectedPlace?.fundingorganisation }}</a></p>
                            <!-- <p><span class="font-weight-medium">Project Name: </span>{{ selectedPlace.projectname }}</p> -->
                            <p class="my-2"><span class="font-weight-medium"></span>{{ mapStore.selectedPlace.impact }}</p>
                            <div class="d-flex flex-row align-center">
                                <v-icon icon="mdi-puzzle-outline" class="mr-1"></v-icon>
                                <p><span class="font-weight-medium">Impact Area: </span>{{ mapStore.selectedPlace.impactarea }}
                                </p>
                            </div>
                            <div class="d-flex flex-row align-center">
                                <v-icon icon="mdi-cash-check" class="mr-1"></v-icon>
                                <p><span class="font-weight-medium">Amount Approved: </span>{{ formattedGrantAmount }}€
                                </p>
                            </div>
                            <div class="d-flex flex-row align-center">
                                <v-icon icon="mdi-calendar" class="mr-1"></v-icon>
                                <p><span class="font-weight-medium">Year Funded: </span>{{ mapStore.selectedPlace.year }}</p>
                            </div>
                        </div>
                        <!-- <div v-for="property in selectedPlace.info" :key="property" class="info-box-content"></div> -->
                    </div>
                    <div v-else class="text-center h-100 d-flex align-center">
                        <p class="text-darkgrey" style="font-size: 20px;">Select a Marker on the Map to See Relevant Data</p>
                    </div>
                <!-- </v-col>
            </v-row> -->
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
}

.sidebar {
    box-sizing: border-box;
    text-align: left;
    width: 400px;
    height: 100%;
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