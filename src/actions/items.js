import axios from 'axios';
import { setError } from './error';
import { tokenConfig } from './auth';
import {
    ALL_TASKS_SUCCESS,
    // ALL_TASKS_FETCH_REQUEST,
    ALL_TASKS_FAIL,

    TASK_SUCCESS,
    // TASK_FETCH_REQUEST,
    TASK_FAIL,

    ALL_OBJECTIVES_SUCCESS,
    // ALL_OBJECTIVES_FETCH_REQUEST,
    ALL_OBJECTIVES_FAIL,

    OBJECTIVE_SUCCESS,
    // OBJECTIVE_FETCH_REQUEST,
    OBJECTIVE_FAIL,

    ALL_KPIS_SUCCESS,
    // ALL_KPIS_FETCH_REQUEST,
    // ALL_KPIS_FAIL,

    KPI_SUCCESS,
    KPI_FAIL,

    EDIT_KPI_SUCCESS,
    EDIT_KPI_FAIL,
    EDIT_KPI_FETCH_REQUEST,

    EDIT_OBJECTIVE_SUCCESS,
    DELETE_OBJECTIVE_SUCCESS,
    EDIT_OBJECTIVE_FAIL,

    // ADD_KPI_SUCCESS,
    // ADD_KPI_FAIL,

    // DELETE_KPI_SUCCESS,
    // DELETE_KPI_FAIL,
    
} from '../actions/types';

export const getClients = () => {
    return function (dispatch, getState) {
        axios.get('/api/clients', tokenConfig(getState))
            .then(res => dispatch({ type: ALL_OBJECTIVES_SUCCESS, payload: res.data })
            )
            .catch(error => dispatch(setError(error.error, error.status, 'ALL_OBJECTIVES_FAIL')),
                dispatch({ type: ALL_OBJECTIVES_FAIL }))
    };
}

//get specific client
export const getClient = (id) => {
    return function (dispatch, getState) {
        axios.get(`/api/client/${id}`, tokenConfig(getState))
            .then(res => dispatch({ type: OBJECTIVE_SUCCESS, payload: res.data })
            )
            .catch(error => dispatch(setError(error.data, error.status, 'OBJECTIVE_FAIL')),
                dispatch({ type: OBJECTIVE_FAIL }))
    }
}

//edit specific client
export const editClient = (id) => {
    return function (dispatch, getState) {
        axios.put(`/api/client/${id}`, tokenConfig(getState))
            .then(res => dispatch({ type: EDIT_OBJECTIVE_SUCCESS, payload: res.data })
            )
            .catch(error => dispatch(setError(error.data, error.status, 'EDIT_OBJECTIVE_FAIL')),
                dispatch({ type: EDIT_OBJECTIVE_FAIL }))
    }
}

//delete specific client
export const deleteClient = (id) => {
    return function (dispatch, getState) {
        axios.delete(`/api/client/${id}`, tokenConfig(getState))
            .then(res => dispatch({ type: DELETE_OBJECTIVE_SUCCESS, payload: res.data })
            )
            .catch(error => dispatch(setError(error.data, error.status, 'DELETE_OBJECTIVE_SUCCESS')),
                dispatch({ type: DELETE_OBJECTIVE_SUCCESS }))
    }
}

//get workers
export const getServiceProviders = () => {
    return function (dispatch, getState) {
        axios.get('/api/workers', tokenConfig(getState))
            .then(res => dispatch({ type: ALL_TASKS_SUCCESS, payload: res.data })
            )
            .catch(error => dispatch(setError(error.error, error.status, 'ALL_TASKS_FAIL')),
                dispatch({ type: ALL_TASKS_FAIL }))
    };

}

//get specific worker
export const getWorker = (id) => {
    return function (dispatch, getState) {
        axios.get(`/api/worker/${id}`, tokenConfig(getState))
            .then(res => dispatch({ type: TASK_SUCCESS, payload: res.data })
            )
            .catch(error => dispatch(setError(error.error, error.status, 'TASK_FAIL')),
                dispatch({ type: TASK_FAIL }))
    }
}

//get jobs
export const getJobs = () => {
    return function (dispatch, getState) {
        axios.get('/api/jobs', tokenConfig(getState))
            .then(res => dispatch({ type: ALL_KPIS_SUCCESS, payload: res.data })
            )
            .catch(error => dispatch(setError(error.error, error.status, 'ALL_KPIS_FAIL')),
            //dispatch({ type: ALL_KPIS_FAIL})
        );
    };
}

//get specific job
export const getJob = (id) => {
    return function (dispatch, getState) {
        axios.get(`/api/job/${id}`, tokenConfig(getState))
            .then(res => dispatch({ type: KPI_SUCCESS, payload: res.data })
            )
            .catch(error => dispatch(setError(error.error, error.status, 'KPI_FAIL')),
                dispatch({ type: KPI_FAIL })
            );
    }
}

//add job
export const addJob = (client_id, title, description, date_added, validity, preferance, location, rating, status) => (dispatch, getState) => {

    const body = JSON.stringify({ client_id, title, description, date_added, validity, preferance, location, rating, status });
    console.log("postbody", body)

    axios.post('/api/job', body, tokenConfig(getState))
        .then((res) => { 
            dispatch({ type: JOB_ADD_SUCCESS,payload: res.data})
        })
        .catch((error) => {
            dispatch(setError(error.error, error.status, 'JOB_ADD_FAIL'))
            // dispatch({ type: JOB_ADD_FAIL, payload: error.error })
        });

}

//edit job
export const editJob = (id, client_id, title, description, date_added, validity, preferance, location, rating, status) => (dispatch, getState) => {

    const body = JSON.stringify({ id, client_id, title, description, date_added, validity, preferance, location, rating, status });
    console.log("postbody", body)

    axios.put(`/api/job/${id}`, body, tokenConfig(getState))
        .then((res) => { 
            dispatch({ type: EDIT_KPI_SUCCESS, payload: res.data})
        })
        .catch((error) => {
            dispatch(setError(error.error, error.status, 'EDIT_KPI_FAIL'))
            dispatch({ type: EDIT_KPI_FAIL, payload: error.error })
            console.log("edit error", error)
        });

}

//DELETE specific job
export const deleteJob = (id) => {
    return function (dispatch, getState) {
        axios.delete(`/api/job/${id}`, tokenConfig(getState))
            .then((res) => {
                console.log("delete resp", res.data)
                dispatch({ type: EDIT_KPI_FETCH_REQUEST, payload: res.data })
                dispatch(getClients())
            })
            .catch(error => dispatch(setError(error.error, error.status, 'JOB_DELETE_FAIL')),
                // dispatch({ type: JOB_DELETE_FAIL })
            );
    }
}
