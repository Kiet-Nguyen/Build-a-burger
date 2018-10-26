import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://build-a-burger-85408.firebaseio.com/',
});

export default instance;
