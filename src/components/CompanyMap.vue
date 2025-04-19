<script setup>
import { ref, onMounted } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import L from 'leaflet';
import api from '@/plugins/axios';

// Custom icon to avoid Leaflet icon issue
const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});

const center = ref([53.3456, -6.2607]); // Default map center (Dublin)
const zoom = ref(6);

const data = ref(null);

onMounted(async () => {
    try {
        const response = await api.get();
        data.value = response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
});
</script>

<template>
    <div class="map-container">
        <LMap v-model:zoom="zoom" v-model:center="center" style="height: 500px; width: 100%;">
            <!-- Tile Layer (OpenStreetMap) -->
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors" />

            <!-- Markers from JSON data -->
            <LMarker v-for="company in data" :key="company.id"
                :lat-lng="[parseFloat(company.geolat), parseFloat(company.geolong)]" :icon="customIcon">
                <LPopup>
                    <div class="popup-content">
                        <strong>{{ company.orgname || 'Unnamed Company' }}</strong>
                        <div v-html="company.info"></div>
                    </div>
                </LPopup>
            </LMarker>
        </LMap>
    </div>
</template>

<style scoped>
.map-container {
    height: 500px;
    width: 100%;
}

.popup-content {
    font-size: 14px;
    line-height: 1.4;
}
</style>
