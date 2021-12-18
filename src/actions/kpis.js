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

    KPI_MONTH_ACTION_SUCCESS,
    KPI_MONTH_ACTION_FETCH_REQUEST,
    KPI_MONTH_ACTION_FAIL

} from '../actions/types';

export const getKpis = (id) => {

    return async function (dispatch) {

        dispatch({ type: ALL_KPIS_FETCH_REQUEST });

        try {

            let response = await axios.get(`kpi/findKpiByUserId?user_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: ALL_KPIS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_KPIS_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_KPIS_FAIL, payload: error.response })
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
            dispatch({ type: KPI_FAIL, payload: error.response })
        }
    }

}

//add specific kpi
export const addKpi = (kpi, uom, category,created_by) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
        
    const body = JSON.stringify({ 
        title : kpi,
        kpiUnitofMeasure : uom,
        categoryId : category,
        createdBy : created_by 
    });
    console.log("kpi", body);

    return async function (dispatch) {

        dispatch({ type: ADD_KPI_FETCH_REQUEST});

        try {

            let response = await axios.post('/kpi/create', body, config)
            if (response.status == 201) {
                dispatch({ type: ADD_KPI_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ADD_KPI_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_KPI_FAIL, payload: error })
        }

    }

}

//edit specific kpi
export const editKpi = (id, kpi, uom, category, created_by, updated_by ) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    const body = JSON.stringify({ 
        title : kpi,
        kpiUnitOfMeasure : uom,
        categoryId : category,
        createdBy : created_by,
        updatedBy : updated_by,
        id: id 
    });
    console.log("kpi", body);

    return async function (dispatch) {

        dispatch({ type: EDIT_KPI_FETCH_REQUEST});

        try {

            let response = await axios.post('/kpi/update', body, config)
            if (response.status == 201) {
                dispatch({ type: EDIT_KPI_SUCCESS, payload: response.data })
            } else {
                console.log("error", response.data)

                dispatch({ type: EDIT_KPI_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: EDIT_KPI_FAIL, payload: error.response.data})
        }

    }

}

//delete specific kpi
export const deleteKpi = (id) => {

    return async function (dispatch) {

        dispatch({ type: DELETE_KPI_FETCH_REQUEST});

        try {

            let response = await axios.post(`/kpi/deleteKpiById?kpi_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: DELETE_KPI_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: DELETE_KPI_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: DELETE_KPI_FAIL, payload: error.response })
        }

    }
}

//get monthly actions
export const getKMonthlyActions = (id) => {

    return async function (dispatch) {

        dispatch({ type: KPI_MONTH_ACTION_FETCH_REQUEST });

        try {

            let response = await axios.get(`/actions/fetchActionsbyUserId?user_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: KPI_MONTH_ACTION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: KPI_MONTH_ACTION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: KPI_MONTH_ACTION_FAIL, payload: error.response })
        }
    }

}



