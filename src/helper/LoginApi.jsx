// api/authApi.js

import instance from './AxiosConfig';



export const loginApi = async (credentials) => {
  
  try {
    const response = await instance.post('/auth/',credentials);
    return response;
  } catch (error) {
    throw error;
  }
};


