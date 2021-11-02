import axios from 'axios';
import {
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FETCH_REQUEST,
    ALL_CATEGORIES_FAIL,

    ALL_ROLES_SUCCESS,
    ALL_ROLES_FETCH_REQUEST,
    ALL_ROLES_FAIL,

    ALL_STATUS_SUCCESS,
    ALL_STATUS_FETCH_REQUEST,
    ALL_STATUS_FAIL,

} from './types';

//all categories
export const getCategories = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_CATEGORIES_FETCH_REQUEST });

        try {

            let response = await axios.get('/categories/all_categories')
            if (response.status == 200) {
                dispatch({ type: ALL_CATEGORIES_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_CATEGORIES_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_CATEGORIES_FAIL, payload: error.response.data })
        }
    }
}

//all roles
export const getRoles = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_ROLES_FETCH_REQUEST });

        try {

            let response = await axios.get('/roles')
            if (response.status == 200) {
                dispatch({ type: ALL_ROLES_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_ROLES_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_ROLES_FAIL, payload: error.response.data.message })
        }
    }
}

//all status
export const getStatus = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_STATUS_FETCH_REQUEST });

        try {

            let response = await axios.get('/roles')
            if (response.status == 200) {
                dispatch({ type: ALL_STATUS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_STATUS_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_STATUS_FAIL, payload: error.response.data.message })
        }
    }
}


