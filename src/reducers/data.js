import {
    ALL_ROLES_SUCCESS,
    ALL_ROLES_FETCH_REQUEST,
    ALL_ROLES_FAIL,

    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FETCH_REQUEST,
    ALL_CATEGORIES_FAIL,

    ALL_STATUS_SUCCESS,
    ALL_STATUS_FETCH_REQUEST,
    ALL_STATUS_FAIL
} from '../actions/types';

const initialState = {
    items : [],
    item: [],
    error : [],
    isLoading : false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ALL_CATEGORIES_FETCH_REQUEST :
        case ALL_ROLES_FETCH_REQUEST :
        case ALL_STATUS_FETCH_REQUEST :
            return {
                ...status,
                isLoading: true
            }

        case ALL_CATEGORIES_SUCCESS :
        case ALL_ROLES_SUCCESS :
        case ALL_STATUS_SUCCESS :
            return {
                ...state,
                items : action.payload.message
            }

        case ALL_CATEGORIES_FAIL :
        case ALL_ROLES_FAIL :
        case ALL_STATUS_FAIL :
            return {
                ...state,
                isLoading: false,
                item : null,
                error: action.payload
            }
        
        default : return state;

    }
}
            

