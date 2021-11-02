import axios from 'axios';
import { setError } from './error';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,

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
export const login = (username, password ) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    const body = JSON.stringify({ username, password });

    console.log(body)

    return async function (dispatch) {

        dispatch({ type: LOGIN_REQUEST });

        try {

            let response = await axios.post('/authenticate', body, config)
            if (response.status == 200) {
                console.log("login response", response)
                dispatch({ type: LOGIN_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: LOGIN_FAIL, payload: response.data })
            }
        } catch (error) {
            console.log("login response", error)
            dispatch({ type: LOGIN_FAIL, payload: error})


            // dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
        }

    }

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