import {GET_ERRORS, CLEAR_ERRORS} from './types';

//Return erors
export const setError = (message, status, id = null) => ({
    type: GET_ERRORS,
    payload: { message, status, id}
});

// Clear errors
export const clearError = () => ({
    type: CLEAR_ERRORS
});