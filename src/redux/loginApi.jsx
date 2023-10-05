// api/authApi.js

import instance from '../helper/AxiosConfig';



export const loginApi = async (credentials) => {
  
  try {
    const response = await instance.post('/auth/',credentials);
    console.log(response);
    return response;

  } catch (error) {
    console.log('error',error)
    throw error;
  }
};
