import axios from 'axios';

const api = axios.create({
    baseURL: 'https://raw.githubusercontent.com/MattReid300/philanthropyjsontest/refs/heads/main/pi-mapmarkers.json',
    // baseURL: 'https://api.github.com/repos/PhilanthropyIreland/json-map-data/contents/pi-mapmarkers.json',
    // headers: {
    //     Authorization: `Bearer `,
    //     Accept: "application/vnd.github.v3.raw" // ensures you get raw JSON
    // }
});

export default api;