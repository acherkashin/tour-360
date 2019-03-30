const axios = require('axios');

const instance = axios.create({
});

instance.interceptors.request.use((config) => {
    // const token = 
    // config.headers.Authorization = token;

    return config;
});

module.exports = instance;