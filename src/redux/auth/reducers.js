import { APICore } from "../../helper/AxiosConfig";



const api = new APICore()

const initialState = {
  isAuthenticated: false,
  user: api.getLoggedInUser(),
  error: null,
  accessToken: null,
  refreshToken: null,
};



const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action?.payload?.data?.access,
        refreshToken: action?.payload?.data?.refresh,
        user: action?.payload?.data,
        error: null,
      };


    case 'LOGIN_FAILURE':

      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error:action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    default:
      return {...state};
  }
};

export default authReducer;
