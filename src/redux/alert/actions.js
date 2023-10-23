export const setError = (error) => {

  const newError = error.error.map(item => item.msg).join(' '); // Joining all success messages
  return {
    type: 'SET_ERROR',
    payload: newError,
  }
};

export const clearError = () => ({
  type: 'CLEAR_ERROR',
});

export const setSuccess = (success) => {
  const newSuccess = success.success.map(item => item.msg).join(' ');
  return {
    type: 'SET_SUCCESS',
    payload: newSuccess,
  }
};

export const clearSuccess = () => ({
  type: 'CLEAR_SUCCESS',
});