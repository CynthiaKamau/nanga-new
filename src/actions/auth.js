import axios from 'axios';
import { setError } from './error';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_FETCH_REQUEST,
    USER_FETCHED,
    LOGOUT,
    AUTH_ERROR
} from '../actions/types';

//check user and load user
export const loadUser = (dispatch, getState) => {

    //user loading
    dispatch({ type: USER_FETCH_REQUEST })

    axios.get(`/user/auth`, tokenConfig(getState))
        .then(res => dispatch({
            type: USER_FETCHED,
            payload: res
        })

        )
        .catch(error => dispatch(setError(error.message, error.status, 'AUTH_ERROR')),
            dispatch({ type: AUTH_ERROR }),
        );

}

//login
export const login = ({ username, password }) => (dispatch) => {

    const config = { headers: { 'Content-Type': 'application/json' } }

    const body = JSON.stringify({ username, password });

    axios.post('/user/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }),)
        .catch(error => dispatch(setError(error.message, error.status, 'LOGIN_FAIL')),
            dispatch({ type: LOGIN_FAIL })
        );

}

//logout
export const logout = () => {
    return { type: LOGOUT }
}

export const tokenConfig = getState => {

    //get token from local storage
    const token = getState().auth.token;

    //headers
    let config = { headers: { "Content-type": "application/json"}}

    //if token add to headers
    if (token) {config.headers['Authorization'] = `Bearer ${token}`;}

    return config;

}