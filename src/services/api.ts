import { setup } from 'axios-cache-adapter';

const api = setup({
  baseURL: 'http://www.mapquestapi.com/geocoding/v1',
  cache: {
    maxAge: 15 * 60 * 1000, // Delay 15 minutes
  },
});

export default api;
