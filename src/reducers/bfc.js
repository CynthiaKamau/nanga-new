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

} from '../actions/types'

const initialState = {
    behaviours : [],
    behaviours_error : null,
    isLoading : false,
    freedoms : [],
    freedoms_error : null,
    constraints : [],
    constraints_error : null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ALL_BEHAVIOURS_FETCH_REQUEST :
        case ALL_FREEDOMS_FETCH_REQUEST :
        case ALL_CONSTRAINTS_FETCH_REQUEST :
            return {
                ...state,
                isLoading: true
            }

        case ALL_BEHAVIOURS_SUCCESS :
            return {
                ...state,
                behaviours : action.payload,
                behaviours_error : null
            }

        case ALL_FREEDOMS_SUCCESS :
            return {
                ...state,
                freedoms : action.payload,
                freedoms_error : null
            }

        case ALL_CONSTRAINTS_SUCCESS :
            return {
                ...state,
                constraints : action.payload,
                constraints_error : null
            }

        case ALL_BEHAVIOURS_FAIL :
            return {
                ...state,
                isLoading : false,
                behaviours : null,
                behaviours_error : action.payload.message
            }

        case ALL_FREEDOMS_FAIL :
            return {
                ...state,
                isLoading : false,
                freedoms : null,
                freedoms_error : action.payload.message
            }

        case ALL_CONSTRAINTS_FAIL :
            return {
                ...state,
                isLoading : false,
                constraints : null,
                constraints_error : action.payload.message
            }

        default : return state;

    }
}