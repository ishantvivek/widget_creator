import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.covid19india.org/state_district_wise.json',
  responseType: 'json',
});