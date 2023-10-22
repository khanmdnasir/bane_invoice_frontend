const initialState = {
  error: null,
  success: null,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ERROR_SUCCESS':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    case 'CLEAR_SUCCESS':
      return { ...state, success: null };
    default:
      return state;
  }
};

export default messagesReducer;