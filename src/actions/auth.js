import axios from 'axios';
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
export const getUser = (id) => {

    //user loading
    return async function (dispatch) {
        dispatch({ type: USER_FETCH_REQUEST })

        try {

            let response = await axios.get(`/users/findByUserId?user_id=${id}`)
            if (response.status == 200) {
                console.log("user res", response.data)
                dispatch({ type: USER_FETCHED, payload: response.data })
            } else {
                dispatch({ type: AUTH_ERROR, payload : response.data });
            }
            
        } catch (error) {
            dispatch({ type: AUTH_ERROR, payload : error.response.data });
        }
    }

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
            if (response.success == true) {
                dispatch({ type: LOGIN_SUCCESS, payload: response.data })
            } else if(response.success == false) {
                dispatch({ type: LOGIN_FAIL, payload: response.data })
            }
        } catch (error) {

            dispatch({ type: LOGIN_FAIL, payload: error.response.data })
        }

    }

}

//logout
export const logout = (dispatch) => {
    return dispatch({ type: LOGOUT });
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