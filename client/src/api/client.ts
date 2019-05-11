import axios from 'axios';
import { UserStore } from '../Stores';

const instance = axios.create({});

instance.interceptors.request.use((config: any) => {
    config.headers.Authorization = UserStore.getToken();

    return config;
});

export default instance;