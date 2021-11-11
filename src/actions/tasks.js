import axios from 'axios';
// import { setError } from './error';
// import { tokenConfig } from './auth';
import {
    ALL_TASKS_SUCCESS,
    ALL_TASKS_FETCH_REQUEST,
    ALL_TASKS_FAIL,

    ALL_ASSIGNED_TASKS_SUCCESS,
    ALL_ASSIGNED_TASKS_FAIL,
    ALL_ASSIGNED_TASKS_FETCH_REQUEST,

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

export const getTasks = (id) => {

    return async function (dispatch) {

        dispatch({ type: ALL_TASKS_FETCH_REQUEST });

        try {

            let response = await axios.get(`/tasks/findTasksByUserId?user_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: ALL_TASKS_SUCCESS, payload: response.data})
            } else {
                console.log("error1",response.data)
                dispatch({ type: ALL_TASKS_FAIL, payload: response.data })
            }

        } catch (error) {
            console.log("error2",error.response.data)

            dispatch({ type: ALL_TASKS_FAIL, payload: error.response.data })
        }
    }
}

export const getAssignedTasks = (id) => {

    return async function (dispatch) {

        dispatch({ type: ALL_ASSIGNED_TASKS_FETCH_REQUEST });

        try {

            let response = await axios.get(`/assignedtasks/findTasksAssigned?user_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: ALL_ASSIGNED_TASKS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_ASSIGNED_TASKS_FAIL, payload: response.data })
            }

        } catch (error) {

            dispatch({ type: ALL_ASSIGNED_TASKS_FAIL, payload: error.response.data })
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
            dispatch({ type: TASK_FAIL, payload: error.response })
        }
    }

}

//add specific task
export const addTask = (description, end_date, start_date, objective_id, user_id, created_by ) => {

    const config = { headers: { 'Content-Type': 'application/json' } }
    
    const body = JSON.stringify({ description, end_date, start_date, objective_id, user_id, created_by });
    console.log("task", body);

    return async function (dispatch) {

        dispatch({ type: ADD_TASK_FETCH_REQUEST});

        try {

            let response = await axios.post('/tasks/create', body, config)
            if (response.status == 201) {
                dispatch({ type: ADD_TASK_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ADD_TASK_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_TASK_FAIL, payload: error.response })
        }

    }

}

//add assigned task
export const addAssignedTask = (description, end_date, start_date, objective_id, user_id ) => {

    const config = { headers: { 'Content-Type': 'application/json' } }
    
    const body = JSON.stringify({ description, end_date, start_date, objective_id, user_id });
    console.log("task", body);

    return async function (dispatch) {

        dispatch({ type: ADD_TASK_FETCH_REQUEST});

        try {

            let response = await axios.post('/tasks/create', body, config)
            if (response.status == 201) {
                dispatch({ type: ADD_TASK_SUCCESS, payload: response.data})
            } else {
                dispatch({ type: ADD_TASK_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_TASK_FAIL, payload: error.response })
        }

    }

}

//edit specific task
export const editTask = (description, end_date, start_date, objective_id, user_id, created_by, updated_by, id, status ) => {
    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    const body = JSON.stringify({ description, end_date, start_date, objective_id, user_id, created_by, updated_by, id, status });
    console.log("task", body);

    return async function (dispatch) {

        dispatch({ type: EDIT_TASK_FETCH_REQUEST});

        try {

            let response = await axios.post('/tasks/update', body, config)
            if (response.status == 201) {
                dispatch({ type: EDIT_TASK_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: EDIT_TASK_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: EDIT_TASK_FAIL, payload: error.response })
        }

    }

}

//delete specific task
export const deleteTask = (id) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
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
            dispatch({ type: ADD_TASK_FAIL, payload: error.response })
        }

    }
}

