import { LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    USER_FETCH_REQUEST,
    USER_FETCHED, 
    AUTH_ERROR,
    LOGOUT } from '../actions/types';

const initialState = {
token : localStorage.getItem('token'),
isAuthenticated : null,
isLoading : null,
user : null,
error : null
}
export default function(state = initialState, action) {
switch(action.type) {
    case USER_FETCH_REQUEST :
    case LOGIN_REQUEST :
        return {
            ...state,
            isLoading : true,
        }
    case LOGIN_SUCCESS :
        localStorage.setItem('token', action.payload.token)
        return {
            ...state, 
            isAuthenticated : true,
            isLoading : false,
            user : action.payload.user,
            token : action.payload.token
        }
    case USER_FETCHED :
        return {
            ...state, 
            isAuthenticated : true,
            isLoading : false,
            user : action.payload.user,
            token : action.payload.token
        }
    case LOGIN_FAIL :
    case AUTH_ERROR :
    case LOGOUT :
        localStorage.removeItem('token');
        return  {
            ...state,
            isAuthenticated: null,
            token: null,
            user : null,
            error : null
        }

    default : return state;

}


}