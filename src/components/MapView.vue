<script setup>
import { ref, computed } from 'vue'
// import api from '@/plugins/axios';
import { useDataStore } from '../stores/mapStore';

const mapStore = useDataStore();

//const places = ref([]);
//const filteredPlaces = ref([]);

//const infoWindow = ref(null);
const selectedPlace = ref(null);

//onMounted(async () => {
// try {
//     const response = await api.get();
//     places.value = response.data.map(item => ({
//         ...item,
//         latitude: parseFloat(item.geolat),
//         longitude: parseFloat(item.geolong),
//     }));
//     filteredPlaces.value = places.value
// } catch (error) {
//     console.error('Failed to fetch data:', error);
// }
//await mapStore.getLocations();
// this.filteredLocations = await mapStore.filteredLocations;
//})

const openInfoWindow = (place) => {
    selectedPlace.value = place;
    mapStore.selectedPlace = place;
    // infoWindow.value?.open(marker);
};

const closeInfoWindow = () => {
    console.log('closeInfoWindow fired');
    selectedPlace.value = null;
    mapStore.selectedPlace = "";
};

const formattedGrantAmount = computed(() => {
    return new Intl.NumberFormat('en-US').format(selectedPlace.value.grantamount);
})
</script>

<template>
    <GMapMap :center="{ lat: 53.3498, lng: -6.2603 }" :zoom="7" style="width: 100%; height: 75vh;" :options="{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
        disableDefaultUI: true
    }">
        <GMapMarker v-for="(place, index) in mapStore.filteredLocations" :key="index"
            :position="{ lat: place.latitude, lng: place.longitude }" :clickable="true" :draggable="false"
            @click="openInfoWindow(place)" />
        <GMapInfoWindow v-if="selectedPlace"
            :position="selectedPlace ? { lat: selectedPlace.latitude, lng: selectedPlace.longitude } : null"
            @closeclick="closeInfoWindow">
            <div class="info-box">
                <div class="d-flex flex-row justify-space-between align-center">
                    <div>
                        <h2>{{ selectedPlace.projectname }}</h2>
                    </div>
                    <button @click="closeInfoWindow" class="close-btn">x</button>
                </div>
                <div class="info-box-content">
                    <div class="d-flex flex-row justify-center align-center">
                        <!-- <v-icon icon="mdi-cash-check" class="mr-1"></v-icon> -->
                        <p style="font-size: 30px;">{{ formattedGrantAmount }}€</p>
                    </div>
                </div>
                <!-- <div v-for="property in selectedPlace.info" :key="property" class="info-box-content"></div> -->
            </div>
        </GMapInfoWindow>
    </GMapMap>
</template>

<style>
.info-box {
    display: flex;
    flex-direction: column;
}

.info-box-content {
    text-align: left;
    /* line-height: 20px; */
}

.close-btn {
    width: 30px;
    /* font-weight: bold; */
    border: none;
    outline: none;
    background: none;
    color: gray;
    font-size: 25px;
}

.close-btn:hover {
    cursor: pointer;
}

.maplabel {
    font-weight: bold;
}
</style>