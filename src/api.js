import axios from 'axios';

export const config = {
  baseURL: 'http://localhost:3001/api'
};

const client = axios.create(config);

export { client };
export default client;
