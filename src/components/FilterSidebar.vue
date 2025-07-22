<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useDataStore } from '../stores/mapStore';

const mapStore = useDataStore();
const isOpen = ref(true);

onMounted(async () => {
    await mapStore.getLocations();

    const filteredOrgs = new Set(mapStore.locations.map(location => location.fundingorganisation).filter(org => org));
    fundingOrganisations.value = Array.from(filteredOrgs).sort();

    const filteredNames = new Set(mapStore.locations.map(location => location.projectname));
    projectNames.value = Array.from(filteredNames).sort();

    const filteredFundingOrgTypes = new Set(mapStore.locations.map(location => location.fundingmodel));
    fundingOrgTypes.value = Array.from(filteredFundingOrgTypes).sort();

    impactAreas.value = Object.keys(mapStore.impactAreaCategories).sort();

    //fundingOrgTypes.value = Object.keys(mapStore.fundingOrgTypes).sort();
})

const fundingOrganisations = ref([])
const projectNames = ref([]);
const yearfunded = ref(["2024", "2023"]);
//const organisationTypes = ref([]);
const impactAreas = ref([]);
const fundingOrgTypes = ref([]);

const selectedFundingOrganisations = ref([])
const selectedProjectNames = ref([]);
const grantRange = ref([0, 6000000]);
const selectedYearFunded = ref([]);
const selectedOrganisationTypes = ref([]);
const selectedImpactAreas = ref([]);



watch(
    [grantRange, selectedFundingOrganisations, selectedProjectNames, selectedImpactAreas, selectedYearFunded, selectedOrganisationTypes],
    ([range, selectedOrgs, selectedNames, selectedAreas, selectedYears, selectedTypes]) => {

        let allSubcategories = [];
        if (selectedAreas && selectedAreas.length > 0) {
            selectedAreas.forEach(category => {
                if (mapStore.impactAreaCategories[category]) {
                    allSubcategories = [...allSubcategories, ...mapStore.impactAreaCategories[category]];
                }
            });
        }

        mapStore.filterLocations({
            min: range[0],
            max: range[1],
            organisations: selectedOrgs,
            names: selectedNames,
            areas: allSubcategories,
            years: selectedYears,
            types: selectedTypes
        });
    }
);

function formatNumber(value) {
    if (value == null || isNaN(value)) return '';
    return value.toLocaleString();
}

function parseNumber(value) {
    return parseInt(value.replace(/,/g, '')) || 0;
}

const formattedMin = computed({
    get: () => formatNumber(grantRange.value[0]),
    set: (val) => {
        grantRange.value[0] = parseNumber(val);
    }
});

const formattedMax = computed({
    get: () => formatNumber(grantRange.value[1]),
    set: (val) => {
        grantRange.value[1] = parseNumber(val);
    }
});
</script>

<template>
    <div class="sidebar-container">
        <div v-if="isOpen" class="sidebar elevation-0">
            <v-row no-gutters>
                <v-col cols="12" class="my-3">
                    <h2>Filter Grants</h2>
                </v-col>
                <v-col cols="12">
                    <h4>Funding Organisation</h4>
                    <v-select v-model="selectedFundingOrganisations" :items="fundingOrganisations"
                        placeholder="Search..." multiple chips clearable>
                        <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index < 1" :text="item.title"></v-chip>
                            <span v-if="index === 1" class="text-grey text-caption align-self-center">
                                (+{{ selectedProjectNames.length - 1 }} others)
                            </span>
                        </template>
                    </v-select>
                </v-col>
                <v-col cols="12">
                    <h4>Project Name</h4>
                    <v-select v-model="selectedProjectNames" :items="projectNames" placeholder="Search..." multiple>
                        <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index < 1" :text="item.title"></v-chip>
                            <span v-if="index === 1" class="text-grey text-caption align-self-center">
                                (+{{ selectedProjectNames.length - 1 }} others)
                            </span>
                        </template>
                    </v-select>
                </v-col>
                <v-col cols="12">
                    <h4>Amount Approved</h4>
                    <div class="d-flex flex-row">
                        <div class="w-50">
                            <v-label>Min:</v-label>
                            <v-text-field v-model="formattedMin" type="text" variant="outlined"
                                class="v-slider-input w-100" hide-details single-line readonly>
                                <template v-slot:append-inner>
                                    <span class="append-text">€</span>
                                </template>
                            </v-text-field>
                        </div>
                        <div class="w-50">
                            <v-label>Max:</v-label>
                            <v-text-field v-model="formattedMax" type="text" variant="outlined" class="v-slider-input"
                                hide-details single-line readonly>
                                <template v-slot:append-inner>
                                    <span class="append-text">€</span>
                                </template>
                            </v-text-field>
                        </div>
                    </div>
                    <v-range-slider v-model="grantRange" :max="6000000" :min="0" :step="1" class="align-center pt-2"
                        hide-details>
                    </v-range-slider>
                </v-col>
                <v-col cols="12">
                    <h4 class="mt-2">Year Funded</h4>
                    <v-select v-model="selectedYearFunded" :items="yearfunded" placeholder="Any..." multiple chips
                        clearable>
                    </v-select>
                </v-col>
                <v-col cols="12">
                    <h4>Funding Organisation Type</h4>
                    <v-select v-model="selectedOrganisationTypes" :items="fundingOrgTypes" placeholder="Search..."
                        multiple clearable>
                        <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index < 1" :text="item.title"></v-chip>
                            <span v-if="index === 1" class="text-grey text-caption align-self-center">
                                (+{{ selectedOrganisationTypes.length - 1 }} others)
                            </span>
                        </template>
                    </v-select>
                </v-col>
                <v-col cols="12">
                    <h4>Impact Area</h4>
                    <v-select v-model="selectedImpactAreas" :items="impactAreas" placeholder="Search..." multiple
                        clearable>
                        <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index < 1" :text="item.title"></v-chip>
                            <span v-if="index === 1" class="text-grey text-caption align-self-center">
                                (+{{ selectedImpactAreas.length - 1 }} others)
                            </span>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<style scoped>
.sidebar-container {
    /* compensate for scale shrink */
    width: 300px;
    /* 400px × 0.85 */
    height: 100%;
    overflow: hidden;
}

.sidebar {
    box-sizing: border-box;
    text-align: left;
    /* height: 100%; */
    width: 400px;
    background-color: #ffffff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    z-index: 20;
    padding: 0 10px 0;
    margin: 0;
    /* overflow-y: auto; */
    transform: scale(0.75);
    transform-origin: top left;
}

.v-slider-input {
    padding: 4px;
}

.v-col {
    padding: 0px;
    /* border: 1px solid #ccc; */
}
</style>