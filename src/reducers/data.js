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
    categories : [],
    category : [],
    roles : [],
    role : [],
    statuses : [],
    status : [],
    error : [],
    isLoading : false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ALL_CATEGORIES_FETCH_REQUEST :
        case ALL_ROLES_FETCH_REQUEST :
        case ALL_STATUS_FETCH_REQUEST :
            return {
                ...state,
                isLoading: true
            }

        case ALL_CATEGORIES_SUCCESS :
            return {
                ...state,
                categories : action.payload
            }
        case ALL_ROLES_SUCCESS : 
            return {
                ...state,
                roles : action.payload
            }
        case ALL_STATUS_SUCCESS :
            return {
                ...state,
                statuses : action.payload
            }

        case ALL_CATEGORIES_FAIL :
            return {
                ...state,
                isLoading: false,
                categories : null,
                error: action.payload.message
            }
        
        case ALL_ROLES_FAIL :
            return {
                ...state,
                isLoading: false,
                roles: null,
                error: action.payload.message
            }
        
        case ALL_STATUS_FAIL :
            return {
                ...state,
                isLoading: false,
                statuses : null,
                error: action.payload.message
            }
        
        default : return state;

    }
}
            

