import axios from 'axios';
// import { setError } from './error';
// import { tokenConfig } from './auth';
import {
    ALL_USERS_SUCCESS,
    ALL_USERS_FETCH_REQUEST,
    ALL_USERS_FAIL,

    USER_SUCCESS,
    USER_FETCH_REQUEST,
    USER_FAIL,

    ADD_USER_SUCCESS,
    ADD_USER_FETCH_REQUEST,
    ADD_USER_FAIL,

    EDIT_USER_SUCCESS,
    EDIT_USER_FETCH_REQUEST,
    EDIT_USER_FAIL,

    DELETE_USER_SUCCESS,
    DELETE_USER_FETCH_REQUEST,
    DELETE_USER_FAIL
} from '../actions/types';

export const getUsers = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_USERS_FETCH_REQUEST });

        try {

            let response = await axios.get('/users/all_users')
            if (response.status == 200) {
                dispatch({ type: ALL_USERS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_USERS_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message })
        }
    }
}

//get specific user
export const getUser = (id) => {

    return async function (dispatch) {

        dispatch({ type: USER_FETCH_REQUEST });

        try {

            let response = await axios.get(`users/findUsersByUserId?${id}`)
            if (response.status == 200) {
                dispatch({ type: USER_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: USER_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: USER_FAIL, payload: error.response.data.message })
        }
    }

}

//add specific user
export const addUser = (name, status, team, role ) => {

    const config = { headers: { 'Content-Type': 'application/json' } }
    
    const body = JSON.stringify({ name, status, team, role });
    console.log("user", body);

    return async function (dispatch) {

        dispatch({ type: ADD_USER_FETCH_REQUEST});

        try {

            let response = await axios.post('/users/create', body, config)
            if (response.status == 200) {
                dispatch({ type: ADD_USER_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ADD_USER_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_USER_FAIL, payload: error.response.data.message })
        }

    }

}

//edit specific user
export const editUser = (user_id, name, status, team, role ) => {
    const config = { headers: { 'Content-Type': 'application/json' } }

    const body = JSON.stringify({ user_id, name, status, team, role });
    console.log("user", body);

    return async function (dispatch) {

        dispatch({ type: EDIT_USER_FETCH_REQUEST});

        try {

            let response = await axios.post('/users/update', body, config)
            if (response.status == 200) {
                dispatch({ type: EDIT_USER_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: EDIT_USER_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: EDIT_USER_FAIL, payload: error.response.data.message })
        }

    }

}

//delete specific user
export const deleteUser = (id) => {
    const config = { headers: { 'Content-Type': 'application/json' } }

    const body = JSON.stringify({ id });
    console.log("user", body);

    return async function (dispatch) {

        dispatch({ type: DELETE_USER_FETCH_REQUEST});

        try {

            let response = await axios.post(`/users/delete`, body, config)
            if (response.status == 200) {
                dispatch({ type: DELETE_USER_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: DELETE_USER_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_USER_FAIL, payload: error.response.data.message })
        }

    }
}

