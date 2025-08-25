<template>
  <div class="main">
    <div class="d-flex flex-row w-100 top">
      <FilterSidebar v-if="mdAndUp" />
      <div class="map-container">
        <MapView />
      </div>
      <InfoSidebar />
    </div>
    <div class="dash-container">
      <DashboardBox />
    </div>
  </div>
</template>

<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import CompanyMap from './components/CompanyMap.vue'
import MapView from './components/MapView.vue'
import FilterSidebar from '@/components/FilterSidebar.vue';
import InfoSidebar from '@/components/InfoSidebar.vue';
import DashboardBox from '@/components/DashboardBox.vue';
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useDisplay } from 'vuetify';

const { mdAndUp } = useDisplay();
const data = ref(null);

onMounted(async () => {
  try {
    const response = await api.get();
    data.value = response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
})
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app,
body {
  margin: 0;
}

/* .gm-ui-hover-effect {
  display: none !important;
} */

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  /* background-color: rgb(167, 225, 167); */
}

.top {
  height: 75vh;
}

.map-container {
  /* width: 500px; */
  height: 100%;
  flex: 1;
}

.dash-container {
  /* width: 500px; */
  height: 25vh;
  /* flex: 1; */
}
</style>