import * as type from "./types";


export const getUser = (limit, page) => ({
 
  type: type.GET_USER_REQUESTED,
  payload: {limit, page},
});

export const getUserDetails = (id) =>{ 
  return ({
  type: type.GET_USER_DETAILS_REQUESTED,
  payload: id,
});}

export const addUser = (formData) => (
  {
  type: type.ADD_USER_REQUESTED,
  payload: formData,
});

export const setUserSuccessAlert = (msg) => ({
  type: type.SET_USER_SUCCESS_ALERT,
  payload: msg,
});

export const setUserErrorAlert = (msg) => ({
  type: type.SET_USER_ERROR_ALERT,
  payload: msg,
});
