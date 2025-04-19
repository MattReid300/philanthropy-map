import { createApp } from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css';
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App)

app.use(vuetify);
app.use(pinia);


app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAI0BiK_spIlne7hC8jEdr5sofPdoCfZHY',
    },
    installComponents: true,
})

app.mount('#app')
