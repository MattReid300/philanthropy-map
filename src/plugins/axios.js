import axios from 'axios';

const api = axios.create({
    baseURL: 'https://raw.githubusercontent.com/MattReid300/philanthropyjsontest/refs/heads/main/6_map_redeveloped.json',
    //baseURL: 'https://gist.githubusercontent.com/intern17/f3b9d999a3d9920ac9d943340b3ff594/raw/7cee33775633961616eaf518db292baa16e8792f/PhilanthropyIrelandMap.json',
});

export default api;