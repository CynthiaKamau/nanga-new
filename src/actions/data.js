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

    EDIT_VISION_SUCCESS,
    EDIT_VISION_FETCH_REQUEST,
    EDIT_VISION_FAIL,


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
            dispatch({ type: ALL_ROLES_FAIL, payload: error.response })
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
            dispatch({ type: ALL_STATUS_FAIL, payload: error.response })
        }
    }
}

//user mission
export const getMission = (id) => {

    return async function (dispatch) {

        dispatch({ type: MISSION_FETCH_REQUEST });

        try {

            let response = await axios.get(`/missions/fetchMissionbyUserId?user_id=${id}`)
            if (response.status == 200) {
                console.log("here", response.data)
                dispatch({ type: MISSION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: MISSION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: MISSION_FAIL, payload: error.response })
        }
    }
}

//edit user mission
export const editMission = (user_id, usermission) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    return async function (dispatch) {

        dispatch({ type: EDIT_MISSION_FETCH_REQUEST });

        const body = JSON.stringify({
            id : user_id,
            description : usermission
         });

        try {

            let response = await axios.post('/missions/update', body, config)
            if (response.status == 200) {
                dispatch({ type: EDIT_MISSION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: EDIT_MISSION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: EDIT_MISSION_FAIL, payload: error.response })
        }
    }
}

//user vision
export const getVision = () => {

    return async function (dispatch) {

        dispatch({ type: VISION_FETCH_REQUEST });

        try {

            let response = await axios.get('/vision/all_vision')
            if (response.status == 200) {
                dispatch({ type: VISION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: VISION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: VISION_FAIL, payload: error.response.data })
        }
    }
}

//edit user vision
export const editVision = (user_id, uservision) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    return async function (dispatch) {

        dispatch({ type: EDIT_VISION_FETCH_REQUEST });

        const body = JSON.stringify({
            id : user_id,
            description : uservision
         });

        try {

            let response = await axios.post('/vision/update', body, config)
            if (response.status == 200) {
                dispatch({ type: EDIT_VISION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: EDIT_VISION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: EDIT_VISION_FAIL, payload: error.response })
        }
    }
}



