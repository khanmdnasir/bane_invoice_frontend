import * as type from "./types";

export const getRoles = (limit, page) => ({
    type: type.GET_ROLE_REQUESTED,
    payload: {limit,page},
  });

  export const getUserRole = () => ({
    type: type.GET_USERROLE_REQUESTED,
    payload: {},
}); 