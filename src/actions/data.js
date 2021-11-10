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

    MISSION_SUCCESS,
    MISSION_FETCH_REQUEST,
    MISSION_FAIL,

    VISION_SUCCESS,
    VISION_FETCH_REQUEST,
    VISION_FAIL,

    EDIT_MISSION_SUCCESS,
    EDIT_MISSION_FETCH_REQUEST,
    EDIT_MISSION_FAIL,


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

            let response = await axios.get('/statuses/all_statuses')
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

//user mission
export const getMission = () => {

    return async function (dispatch) {

        dispatch({ type: MISSION_FETCH_REQUEST });

        try {

            let response = await axios.get('/statuses/all_statuses')
            if (response.status == 200) {
                dispatch({ type: MISSION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: MISSION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: MISSION_FAIL, payload: error.response.data.message })
        }
    }
}

//edit user mission
export const editMission = (id) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    return async function (dispatch) {

        dispatch({ type: EDIT_MISSION_FETCH_REQUEST });

        const body = JSON.stringify({ id });

        try {

            let response = await axios.post('/statuses/all_statuses', body, config)
            if (response.status == 200) {
                dispatch({ type: EDIT_MISSION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: EDIT_MISSION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: EDIT_MISSION_FAIL, payload: error.response.data.message })
        }
    }
}

//user vision
export const getVision = () => {

    return async function (dispatch) {

        dispatch({ type: VISION_FETCH_REQUEST });

        try {

            let response = await axios.get('/statuses/all_statuses')
            if (response.status == 200) {
                dispatch({ type: VISION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: VISION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: VISION_FAIL, payload: error.response.data.message })
        }
    }
}



