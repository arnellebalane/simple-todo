import axios from 'axios';

axios.defaults.baseURL = import.meta.env.SNOWPACK_PUBLIC_FUNCTIONS_URL;

export default axios;
