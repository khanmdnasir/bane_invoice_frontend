export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error,
});

export const clearError = () => ({
  type: 'CLEAR_ERROR',
});

export const setSuccess = (success) => ({
  type: 'SET_SUCCESS',
  payload: success,
});

export const clearSuccess = () => ({
  type: 'CLEAR_SUCCESS',
});