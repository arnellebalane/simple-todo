import axios from '@lib/axios';
import { trackEvent } from '@lib/umami';

function createStore() {
    function getBackgroundImage(url) {
        const source = axios.CancelToken.source();
        const params = url ? { url } : {};
        console.log({ params });
        const request = axios.get('/get-background-image', { params, cancelToken: source.token }).then((response) => {
            trackEvent('background', 'refresh');
            return response.data;
        });
        return { source, request };
    }

    return { getBackgroundImage };
}

export const backgrounds = createStore();
