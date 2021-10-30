import axios from 'axios';
// import { setError } from './error';
// import { tokenConfig } from './auth';
import {
    ALL_KPIS_SUCCESS,
    ALL_KPIS_FETCH_REQUEST,
    ALL_KPIS_FAIL,

    KPI_SUCCESS,
    KPI_FAIL,
    KPI_FETCH_REQUEST,

    ADD_KPI_SUCCESS,
    ADD_KPI_FETCH_REQUEST,
    ADD_KPI_FAIL,

    EDIT_KPI_SUCCESS,
    EDIT_KPI_FETCH_REQUEST,
    EDIT_KPI_FAIL,

    DELETE_KPI_SUCCESS,
    DELETE_KPI_FETCH_REQUEST,
    DELETE_KPI_FAIL,

} from '../actions/types';

export const getKpis = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_KPIS_FETCH_REQUEST });

        try {

            let response = await axios.get('/kpi/all_kpis')
            if (response.status == 200) {
                dispatch({ type: ALL_KPIS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_KPIS_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_KPIS_FAIL, payload: error.response.data.message })
        }
    }
}

//get specific kpi
export const getUserKpis = (id) => {

    return async function (dispatch) {

        dispatch({ type: KPI_FETCH_REQUEST });

        try {

            let response = await axios.get(`kpis/findkpiByUserId?${id}`)
            if (response.status == 200) {
                dispatch({ type: KPI_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: KPI_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: KPI_FAIL, payload: error.response.data.message })
        }
    }

}

//add specific kpi
export const addKpi = (categoryId, createdBy, kpiUnitofMeasure, title) => {

    const config = { headers: { 'Content-Type': 'application/json' } }
    
    const body = JSON.stringify({ categoryId, createdBy, kpiUnitofMeasure, title });
    console.log("kpi", body);

    return async function (dispatch) {

        dispatch({ type: ADD_KPI_FETCH_REQUEST});

        try {

            let response = await axios.post('/kpi/create', body, config)
            if (response.status == 200) {
                dispatch({ type: ADD_KPI_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ADD_KPI_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_KPI_FAIL, payload: error.response.data.message })
        }

    }

}

//edit specific kpi
export const editKpi = (id, categoryId, title, kpiUnitofMeasurecreatedBy, updatedBy, createdBy, dateCreated, dateUpdated ) => {

    const body = JSON.stringify({ id, categoryId, title, kpiUnitofMeasurecreatedBy, updatedBy, createdBy, dateCreated, dateUpdated });
    console.log("kpi", body);

    return async function (dispatch) {

        dispatch({ type: EDIT_KPI_FETCH_REQUEST});

        try {

            let response = await axios.post('/kpi/update', body, config)
            if (response.status == 200) {
                dispatch({ type: EDIT_KPI_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: EDIT_KPI_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: EDIT_KPI_FAIL, payload: error.response.data.message })
        }

    }

}

//delete specific kpi
export const deleteKpi = (id) => {

    const body = JSON.stringify({ id });
    console.log("kpi", body);

    return async function (dispatch) {

        dispatch({ type: DELETE_KPI_FETCH_REQUEST});

        try {

            let response = await axios.post(`/kpi/delete`, body, config)
            if (response.status == 200) {
                dispatch({ type: DELETE_KPI_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: DELETE_KPI_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_KPI_FAIL, payload: error.response.data.message })
        }

    }
}

