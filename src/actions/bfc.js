import axios from "axios";
import {
    ALL_BEHAVIOURS_SUCCESS,
    ALL_BEHAVIOURS_FETCH_REQUEST,
    ALL_BEHAVIOURS_FAIL,

    ALL_FREEDOMS_SUCCESS,
    ALL_FREEDOMS_FETCH_REQUEST,
    ALL_FREEDOMS_FAIL,

    ALL_CONSTRAINTS_SUCCESS,
    ALL_CONSTRAINTS_FETCH_REQUEST,
    ALL_CONSTRAINTS_FAIL,
    
} from './types'

export const getBehaviours = (id) => {

    return async function (dispatch) {

        dispatch({ type : ALL_BEHAVIOURS_FETCH_REQUEST });

        try {

            let response = await axios.get(`/behaviours/fetchBehaviourbyUserId?user_id=${id}`)
            if(response.status == 200) {
                dispatch({ type: ALL_BEHAVIOURS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_BEHAVIOURS_FAIL, payload: response.data })
            }
            
        } catch (error) {
            dispatch({ type: ALL_BEHAVIOURS_FAIL, payload: error.response.data })
        }
    }
}

export const getFreedoms = (id) => {

    return async function (dispatch) {

        dispatch({ type : ALL_FREEDOMS_FETCH_REQUEST });

        try {

            let response = await axios.get(`/freedoms/fetchFreedomsbyUserId?user_id=${id}`)
            if(response.status == 200) {
                dispatch({ type: ALL_FREEDOMS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_FREEDOMS_FAIL, payload: response.data })
            }
            
        } catch (error) {
            dispatch({ type: ALL_FREEDOMS_FAIL, payload: error.response.data })
        }
    }
}

export const getConstraints = (id) => {

    return async function (dispatch) {

        dispatch({ type : ALL_CONSTRAINTS_FETCH_REQUEST });

        try {

            let response = await axios.get(`/constraints/fetchConstraintsbyUserId?user_id=${id}`)
            if(response.status == 200) {
                dispatch({ type: ALL_CONSTRAINTS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_CONSTRAINTS_FAIL, payload: response.data })
            }
            
        } catch (error) {
            dispatch({ type: ALL_CONSTRAINTS_FAIL, payload: error.response.data })
        }
    }
}