// api/authApi.js

import axios from 'axios';

export const loginApi = async (credentials) => {
  try {
     const response=  axios.post(`http://192.168.30.17:8000/api/auth/`,credentials).then((response)=>{
        console.log(response.data)
    })
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
