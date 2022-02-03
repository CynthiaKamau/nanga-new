import { LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    USER_FETCH_REQUEST,
    USER_FETCHED, 
    AUTH_ERROR,
    LOGOUT } from '../actions/types';

const initialState = {
token : null,
isAuthenticated : null,
isLoading : false,
user : null,
error : null,
myuser : null,
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
        return {
            ...state, 
            isAuthenticated : true,
            isLoading : false,
            user : action.payload.user,
            token : action.payload.accessToken,
            error : null
        }
    case USER_FETCHED :
        return {
            ...state, 
            isAuthenticated : true,
            isLoading : false,
            myuser : action.payload.data,
        }
    case LOGIN_FAIL :
    case AUTH_ERROR :
        localStorage.removeItem('token');
        return  {
            ...state,
            isAuthenticated: false,
            token: null,
            user : null,
            myuser: null,
            error : action.payload.message
        }

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