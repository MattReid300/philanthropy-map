// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // important
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const lightTheme = {
    dark: false,
    colors: {
        primary: '#2c3e50',
        grey: '#a9a9a9',
        darkgrey: '#686868ff'
    }
}

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'lightTheme', 
        themes: {
            lightTheme
        }
    },
    icons: {
        defaultSet: 'mdi',
        sets: {
            mdi: {},
        },
    },
})