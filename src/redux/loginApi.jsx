// api/authApi.js

import axios from 'axios';
import config from '../../config.js';

export const loginApi = async  (credentials) => {

  try {
     const response= await axios.post(`${config.API_URL}/api/auth/`,credentials).then((response)=>{
        console.log(response.data);
    })
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
