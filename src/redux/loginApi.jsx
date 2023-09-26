// api/authApi.js

import axios from 'axios';

export const loginApi = async (credentials) => {
  try {
    const response = await axios({
   
        method: 'POST',
        url: `https://192.168.30.17:8000/api/auth`,
        withCredentials: true,
        params: {
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1NzU3NDkzLCJpYXQiOjE2OTU3Mjg2OTMsImp0aSI6ImVlNzY1NjRlOTllZDQ4NGFhYjVjZGEwYzkwM2M0ZTU1IiwidXNlcl9pZCI6MX0.Au8y1Z0P0bebEkPvsO1YphIQMGdGRKgMNf05L7c_rI4",
        },
      
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
