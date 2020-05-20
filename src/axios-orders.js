import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-5618c.firebaseio.com/'
});

export default instance;