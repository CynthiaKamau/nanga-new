import axios from 'axios';
// import { setError } from './error';
// import { tokenConfig } from './auth';
import {
    ALL_USERS_SUCCESS,
    ALL_USERS_FETCH_REQUEST,
    ALL_USERS_FAIL,

    USER_TEAM_SUCCESS,
    USER_TEAM_FETCH_REQUEST,
    USER_TEAM_FAIL,

    ALL_RESOURCE_USERS_SUCCESS,
    ALL_RESOURCE_USERS_FETCH_REQUEST,
    ALL_RESOURCE_USERS_FAIL,

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
            dispatch({ type: ALL_USERS_FAIL, payload: error.response.data })
        }
    }
}

//get exclusive user
export const getResourceUsers = (id) => {
    return async function (dispatch) {

        dispatch({ type: ALL_RESOURCE_USERS_FETCH_REQUEST });

        try {

            let response = await axios.get(`/users/findAllExceptLoggedInUser?user_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: ALL_RESOURCE_USERS_SUCCESS, payload: response.data.data })
            } else {
                dispatch({ type: ALL_RESOURCE_USERS_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_RESOURCE_USERS_FAIL, payload: error.response.data })
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
            dispatch({ type: USER_FAIL, payload: error.response })
        }
    }

}

//get exclusive user

//add specific user
export const addUser = (search_user, created_by, team, role, search_email ) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    
    const body = JSON.stringify({
        full_name : search_user ,
        team : team,
        role : role,
        email : search_email,
        extension : 0,
        view : true,
        created_by : created_by
    });

    console.log("user", body);

    return async function (dispatch) {

        dispatch({ type: ADD_USER_FETCH_REQUEST});

        try {

            let response = await axios.post('/users', body, config)
            if (response.status == 201) {
                dispatch({ type: ADD_USER_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ADD_USER_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_USER_FAIL, payload: error.response.data })
        }

    }

}

//edit specific user
export const editUser = (user_id, name, status, team, role, updated_by, view, extension, email, disabled ) => {
    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    const body = JSON.stringify({ 
        id : user_id,
        fullnames : name,
        email : email,
        status : status,
        extension : extension,
        disabled : disabled,
        team_id : team, 
        role_id : role,
        updated_by_id : updated_by,
        view : view,
        
        });
    console.log("user", body);

    return async function (dispatch) {

        dispatch({ type: EDIT_USER_FETCH_REQUEST});

        try {

            let response = await axios.post('/users/update', body, config)
            if (response.status == 201) {
                console.log("success", response.data)
                dispatch({ type: EDIT_USER_SUCCESS, payload: response.data })
            } else {
                console.log("fail", response.data)
                dispatch({ type: EDIT_USER_FAIL, payload: response.data })
            }
        } catch (error) {
            console.log("fail", error)
            dispatch({ type: EDIT_USER_FAIL, payload: error.response.data })
        }

    }

}

//get specific user team members
export const getUserTeamates = (id) => {

    return async function (dispatch) {

        dispatch({ type: USER_TEAM_FETCH_REQUEST });

        try {

            let response = await axios.get(`users/all_per_team?user_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: USER_TEAM_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: USER_TEAM_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: USER_TEAM_FAIL, payload: error.response })
        }
    }

}

//delete specific user
export const deleteUser = (id) => {
    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
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
            dispatch({ type: ADD_USER_FAIL, payload: error.response })
        }

    }
}

