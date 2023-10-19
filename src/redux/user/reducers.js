import * as type from './types';

const INIT_STATE = {
    users: [],
    create_users: {},
    user_details: {},
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
    success: null
};





const User = (state = INIT_STATE, action) => {
    switch (action.type) {
        case type.GET_USER_REQUESTED: {

            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_USER_SUCCESS: {

            return {
                ...state,
                loading: false,
                users: action.data.data,
                // usersid: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_USER_FAILED: {

            return {
                ...state,
                loading: false,
                error: action.error
            };
        }


        case type.GET_USER_DETAILS_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_USER_DETAILS_SUCCESS: {
            // console.log(action.data)
            return {
                ...state,
                loading: false,
                user_details: action.data,

            };
        }
        case type.GET_USER_DETAILS_FAILED: {

            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.ADD_USER_REQUESTED: {

            return {
                ...state,
                loading: true,
            };
        }
        case type.ADD_USER_SUCCESS: {
           
            return {
                ...state,
                loading: false,
                success: 'User created successfully',
                users: [...state.users, action.user.data],
                create_users: action.user,
               

            };
        }
        case type.ADD_USER_FAILED: {

            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.SET_USER_SUCCESS_ALERT: {
            // console.log('reducer',action)
            console.log(action.payload);

            return {
                ...state,
                success: action.payload,
            };
        }

        case type.SET_USER_ERROR_ALERT: {
            // console.log('reducer error',action)

            return {
                ...state,
                error: action.payload,
            };
        }

        default:
            return state;
    }
};

export default User;
