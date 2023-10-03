// axiosConfig.js

import axios from 'axios';
import config from '../../config';

let authTokens= localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;


const instance = axios.create({
  baseURL: `${config.API_URL}/api`,
  headers:{Authorization:`Bearer ${authTokens?.access}`}
});

instance.interceptors.response.use(
  function (response) {
    console.log('Response received with data:',response);
    return response;
  }
  ,
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      let message;
  
      if (
        error.response.data.code === "token_not_valid" &&
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        const userInfo = JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY) || "");
  
        const refreshToken = userInfo.refresh;
        if (refreshToken) {
          const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
  
          // exp date in token is expressed in seconds, while now() returns milliseconds:
          const now = Math.ceil(Date.now() / 1000);
          console.log(tokenParts.exp);
  
          if (tokenParts.exp > now) {
            return axios
              .post("/api/token/refresh/", { refresh: refreshToken })
              .then((response) => {
                const newUpdateUserInfo = {
                  ...userInfo,
                  access: response.data.access,
                };
                localStorage.setItem(
                  AUTH_TOKEN_KEY,
                  JSON.stringify(newUpdateUserInfo)
                );
  
                axios.defaults.headers.common["Authorization"] =
                  "Bearer " + response.data.access;
                window.location.href = "/";
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log("Refresh token is expired", tokenParts.exp, now);
            localStorage.removeItem(AUTH_TOKEN_KEY);
            window.location.href = "/auth/login/";
          }
        } else {
          console.log("Refresh token not available.");
          window.location.href = "/auth/login/";
        }
      } else if (error && error.response && error.response.status === 404) {
        // window.location.href = '/not-found';
      } else if (error && error.response && error.response.status === 403) {
        window.location.href = "/access-denied";
      } else {
        switch (error.response.status) {
          case 401:
            message = "Invalid credentials";
            break;
          case 403:
            message = "Access Forbidden";
            break;
          case 404:
            message = "Sorry! the data you are looking for could not be found";
            break;
          default: {
            message =
              error.response && error.response.data
                ? error.response.data["message"]
                : error.message || error;
          }
        }
        return Promise.reject(message);
      }
    }

);

 const Auth = async (e) => {
        e.preventDefault();
        try {

            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            navigate("/dashboard");

        } catch (error) {
            const getSettingValue = await axios.post('http://localhost:5000/get_setting_value',{
                nameKey:'login_attempt_count'
            });
            let finalCount = parseInt(getSettingValue.data.value)+1;
            setLoginCount(finalCount)

            if (finalCount<=defaultLoginAttempt){
                await axios.patch('http://localhost:5000/update_setting_value',{
                    nameKey:'login_attempt_count',
                    value:finalCount.toString()
                });
                setLoginAttempt(defaultLoginAttempt-finalCount);
            }

            if (error.response) {


                setMsg(error.response.data.msg);

            }
        }
    }

export default instance;


