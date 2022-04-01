import {
    ALL_KPIS_SUCCESS,
    ALL_KPIS_FETCH_REQUEST,
    ALL_KPIS_FAIL,

    KPI_SUCCESS,
    KPI_FETCH_REQUEST,
    KPI_FAIL,

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
    KPI_MONTH_ACTION_FAIL,

    KPI_MONTH_REPORT_SUCCESS,
    KPI_MONTH_REPORT_FETCH_REQUEST,
    KPI_MONTH_REPORT_FAIL

} from '../actions/types';

const initialState = {
    items : [],
    item: [],
    error : [],
    monthly_data : [],
    monthly_data_error : [],
    monthly_report : [],
    monthly_report_error : [],
    monthly_report_name : [],
    isLoading : false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ALL_KPIS_FETCH_REQUEST : 
        case KPI_FETCH_REQUEST :
        case ADD_KPI_FETCH_REQUEST :
        case EDIT_KPI_FETCH_REQUEST :
        case DELETE_KPI_FETCH_REQUEST :
        case KPI_MONTH_ACTION_FETCH_REQUEST :
        case KPI_MONTH_REPORT_FETCH_REQUEST :
            return {
                ...state,
                isLoading: true
            }

        case ALL_KPIS_SUCCESS :
            return {
                ...state,
                items : action.payload.data,
                isLoading : false,
                error : null
            }

        case KPI_MONTH_ACTION_SUCCESS :
            return {
                ...state,
                monthly_data : action.payload.data,
                isLoading : false,
                monthly_data_error : null
            }

        case KPI_MONTH_REPORT_SUCCESS :
            return {
                ...state,
                monthly_report : action.payload.kpiReports,
                isLoading : false,
                monthly_report_error : null,
                monthly_report_name : action.payload.reportName
            }

        case KPI_SUCCESS :
        case ADD_KPI_SUCCESS :
        case EDIT_KPI_SUCCESS :
        case DELETE_KPI_SUCCESS :
            return {
                ...state,
                item : action.payload.message,
                isLoading : false,
                error : null
            }

        case KPI_MONTH_ACTION_FAIL :
            return {
                ...state,
                isLoading: false,
                monthly_data : null,
                monthly_data_error: action.payload.message
            }

        case KPI_MONTH_REPORT_FAIL :
            return {
                ...state,
                isLoading: false,
                monthly_report : null,
                monthly_report_error: action.payload.message,
                monthly_report_name : null
            }

        case ALL_KPIS_FAIL :
            return {
                ...state,
                isLoading: false,
                items : null,
                error: action.payload.message
            }
        case KPI_FAIL :
        case ADD_KPI_FAIL :
        case EDIT_KPI_FAIL :
        case DELETE_KPI_FAIL :
            return {
                ...state,
                isLoading: false,
                item : null,
                error: action.payload.message
            }
        
        default : return state;
    }
}