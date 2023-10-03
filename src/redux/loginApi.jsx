// api/authApi.js

import instance from '../helper/AxiosConfig';



export const loginApi = async  (credentials) => {

  
  try {
     const response= await instance.post('/auth/',credentials).then((response)=>{
      return response.data;
    })
  } catch (error) {
    throw error;
  }
};
