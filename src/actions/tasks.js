import axios from 'axios';
// import { setError } from './error';
// import { tokenConfig } from './auth';
import {
    ALL_TASKS_SUCCESS,
    ALL_TASKS_FETCH_REQUEST,
    ALL_TASKS_FAIL,

    TASK_SUCCESS,
    TASK_FAIL,
    TASK_FETCH_REQUEST,

    ADD_TASK_SUCCESS,
    ADD_TASK_FETCH_REQUEST,
    ADD_TASK_FAIL,

    EDIT_TASK_SUCCESS,
    EDIT_TASK_FETCH_REQUEST,
    EDIT_TASK_FAIL,

    DELETE_TASK_SUCCESS,
    DELETE_TASK_FETCH_REQUEST,
    DELETE_TASK_FAIL,

} from '../actions/types';

export const getTasks = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_TASKS_FETCH_REQUEST });

        try {

            let response = await axios.get('/tasks')
            if (response.status == 200) {
                dispatch({ type: ALL_TASKS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_TASKS_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_TASKS_FAIL, payload: error.response.data.message })
        }
    }
}

//get specific task
export const getTask = (id) => {

    return async function (dispatch) {

        dispatch({ type: TASK_FETCH_REQUEST });

        try {

            let response = await axios.get(`tasks/findtaskByUserId?${id}`)
            if (response.status == 200) {
                dispatch({ type: TASK_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: TASK_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: TASK_FAIL, payload: error.response.data.message })
        }
    }

}

//add specific task
export const addTask = (user_id, target, start_date, kpi_id, end_date, description, created_by ) => {

    const config = { headers: { 'Content-Type': 'application/json' } }
    
    const body = JSON.stringify({ user_id, target, start_date, kpi_id, end_date, description, created_by });
    console.log("task", body);

    return async function (dispatch) {

        dispatch({ type: ADD_TASK_FETCH_REQUEST});

        try {

            let response = await axios.post('/tasks/create', body, config)
            if (response.status == 200) {
                dispatch({ type: ADD_TASK_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ADD_TASK_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_TASK_FAIL, payload: error.response.data.message })
        }

    }

}

//edit specific task
export const editTask = (id, description, kpi_id, user_id, start_date, end_date,  target, target_achieved, target_achieved_on_review, created_by, updated_by ) => (dispatch, getState) => {

    const body = JSON.stringify({ id, description, kpi_id, user_id, start_date, end_date,  target, target_achieved, target_achieved_on_review, created_by, updated_by });
    console.log("task", body);

    return async function (dispatch) {

        dispatch({ type: EDIT_TASK_FETCH_REQUEST});

        try {

            let response = await axios.post('/tasks/update', body, config)
            if (response.status == 200) {
                dispatch({ type: EDIT_TASK_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: EDIT_TASK_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: EDIT_TASK_FAIL, payload: error.response.data.message })
        }

    }

}

//delete specific task
export const deleteTask = (id) => {
    const body = JSON.stringify({ id });
    console.log("task", body);

    return async function (dispatch) {

        dispatch({ type: DELETE_TASK_FETCH_REQUEST});

        try {

            let response = await axios.post(`/tasks/delete`, body, config)
            if (response.status == 200) {
                dispatch({ type: DELETE_TASK_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: DELETE_TASK_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_TASK_FAIL, payload: error.response.data.message })
        }

    }
}

