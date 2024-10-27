import axios from 'axios';

import { config } from '@lib/config';

axios.defaults.baseURL = config.VITE_PUBLIC_FUNCTIONS_URL;

export default axios;
