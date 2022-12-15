import geocoder from 'node-geocoder';
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey:
    'AIzaSyArfqV-Iq4X4IUP2gkPqKUYEzcGAxUv5SI' || process.env.GEOCODER_API_KEY,
  formatter: null, // 'gpx', 'string', ...
};

const mapgeocoder = geocoder(options);

export default mapgeocoder;
