import axios from 'axios';
// import { setError } from './error';
// import { tokenConfig } from './auth';
import {
    ALL_OBJECTIVES_SUCCESS,
    ALL_OBJECTIVES_FETCH_REQUEST,
    ALL_OBJECTIVES_FAIL,

    OBJECTIVE_SUCCESS,
    OBJECTIVE_FAIL,
    OBJECTIVE_FETCH_REQUEST,

    ADD_OBJECTIVE_SUCCESS,
    ADD_OBJECTIVE_FETCH_REQUEST,
    ADD_OBJECTIVE_FAIL,

    EDIT_OBJECTIVE_SUCCESS,
    EDIT_OBJECTIVE_FETCH_REQUEST,
    EDIT_OBJECTIVE_FAIL,

    DELETE_OBJECTIVE_SUCCESS,
    DELETE_OBJECTIVE_FETCH_REQUEST,
    DELETE_OBJECTIVE_FAIL,

    OBJECTIVE_TASKS_SUCCESS,
    OBJECTIVE_TASKS_FETCH_REQUEST,
    OBJECTIVE_TASKS_FAIL,

    OBJECTIVES_MONTH_ACTION_SUCCESS,
    OBJECTIVES_MONTH_ACTION_FETCH_REQUEST,
    OBJECTIVES_MONTH_ACTION_FAIL,

    OBJECTIVES_MONTH_REPORT_SUCCESS,
    OBJECTIVES_MONTH_REPORT_FETCH_REQUEST,
    OBJECTIVES_MONTH_REPORT_FAIL

} from '../actions/types';

export const getObjectives = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_OBJECTIVES_FETCH_REQUEST });

        try {

            let response = await axios.get('/objectives')
            if (response.status == 200) {
                dispatch({ type: ALL_OBJECTIVES_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_OBJECTIVES_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_OBJECTIVES_FAIL, payload: error.response })
        }
    }
}

//get specific objective
export const getUserObjectives = (id) => {

    return async function (dispatch) {

        dispatch({ type: OBJECTIVE_FETCH_REQUEST });

        try {

            let response = await axios.get(`/objectives/findObjectiveByUserId?user_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: OBJECTIVE_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: OBJECTIVE_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: OBJECTIVE_FAIL, payload: error.response })
        }
    }

}

//add specific objective
export const addUserObjective = (user_id, target, start_date, kpi_id, end_date, description, created_by ) => {

    const config = { headers: { 'Content-Type': 'application/json' } }
    
    const body = JSON.stringify({ user_id, target, start_date, kpi_id, end_date, description, created_by });
    console.log("objective", body);

    return async function (dispatch) {

        dispatch({ type: ADD_OBJECTIVE_FETCH_REQUEST});

        try {

            let response = await axios.post('/objectives/create', body, config)
            if (response.status == 201) {
                dispatch({ type: ADD_OBJECTIVE_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ADD_OBJECTIVE_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_OBJECTIVE_FAIL, payload: error.response })
        }

    }

}

//get tasks in objective
export const getObjectiveTasks = (id) => {

    console.log("id here", id)
    return async function (dispatch) {

        dispatch({ type: OBJECTIVE_TASKS_FETCH_REQUEST });

        try {

            let response = await axios.get(`/tasks/fetchTasksbyObjectiveId?objective_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: OBJECTIVE_TASKS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: OBJECTIVE_TASKS_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: OBJECTIVE_TASKS_FAIL, payload: error.response })
        }
    }

}

//edit specific objective
export const editUserObjective = (id, description, kpi_id, user_id, start_date, end_date,  target, target_achieved, target_achieved_on_review, created_by, updated_by ) => {
    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    const body = JSON.stringify({ id, description, kpi_id, user_id, start_date, end_date,  target, target_achieved, target_achieved_on_review, created_by, updated_by });
    console.log("objective", body);

    return async function (dispatch) {

        dispatch({ type: EDIT_OBJECTIVE_FETCH_REQUEST});

        try {

            let response = await axios.post('/objectives/update', body, config)
            if (response.status == 201) {
                dispatch({ type: EDIT_OBJECTIVE_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: EDIT_OBJECTIVE_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: EDIT_OBJECTIVE_FAIL, payload: error.response.data })
        }

    }

}

//delete specific objective
export const deleteUserObjective = (id) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    const body = JSON.stringify({ id });
    console.log("objective", body);

    return async function (dispatch) {

        dispatch({ type: DELETE_OBJECTIVE_FETCH_REQUEST});

        try {

            let response = await axios.post(`/objectives/delete`, body, config)
            if (response.status == 200) {
                dispatch({ type: DELETE_OBJECTIVE_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: DELETE_OBJECTIVE_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_OBJECTIVE_FAIL, payload: error.response })
        }

    }
}

//get monthly actions
export const getOMonthlyActions = (id) => {

    return async function (dispatch) {

        dispatch({ type: OBJECTIVES_MONTH_ACTION_FETCH_REQUEST });

        try {

            let response = await axios.get(`/objectivesactions/fetchActionsbyUserId?user_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: OBJECTIVES_MONTH_ACTION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: OBJECTIVES_MONTH_ACTION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: OBJECTIVES_MONTH_ACTION_FAIL, payload: error.response })
        }
    }

}

//get monthly report
export const getOMonthlyReport = (user_id, month, year) => {

    let report_name = `${month + year + 'Report'}`;

    return async function (dispatch) {

        dispatch({ type: OBJECTIVES_MONTH_REPORT_FETCH_REQUEST });

        try {
            let response = await axios.get(`/objectivesReports/filterObjectivesReport?user_id=${user_id}&reportName=${report_name}`)
            if (response.status == 200) {
                dispatch({ type: OBJECTIVES_MONTH_REPORT_SUCCESS, payload: response.data.data })
            } else {
                dispatch({ type: OBJECTIVES_MONTH_REPORT_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: OBJECTIVES_MONTH_REPORT_FAIL, payload: error.response })
        }
    }

}

