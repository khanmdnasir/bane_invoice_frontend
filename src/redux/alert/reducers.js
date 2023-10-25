const initialState = {
  error: null,
  success: null,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_ERROR_SUCCESS':
      return { ...state, error: action.payload, success: null };
    case 'SET_SUCCESS_SUCCESS':
      return { ...state, success: action.payload, error: null };
    case 'CLEAR_ERROR_SUCCESS':
      return { ...state, error: null, success: null };

    default:
      return state;
  }
};

export default messagesReducer;