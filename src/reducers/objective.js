import {
    ALL_OBJECTIVES_SUCCESS,
    ALL_OBJECTIVES_FETCH_REQUEST,
    ALL_OBJECTIVES_FAIL,
    
    OBJECTIVE_SUCCESS,
    OBJECTIVE_FETCH_REQUEST,
    OBJECTIVE_FAIL,

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
    OBJECTIVE_TASKS_FAIL


} from '../actions/types';

const initialState = {
    items : [],
    item: [],
    obj_tasks: [],
    error : [],
    isLoading : false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ALL_OBJECTIVES_FETCH_REQUEST : 
        case OBJECTIVE_FETCH_REQUEST :
        case ADD_OBJECTIVE_FETCH_REQUEST :
        case EDIT_OBJECTIVE_FETCH_REQUEST :
        case DELETE_OBJECTIVE_FETCH_REQUEST :
        case OBJECTIVE_TASKS_FETCH_REQUEST :
            return {
                ...state,
                isLoading: true
            }

        case OBJECTIVE_SUCCESS :
        case ALL_OBJECTIVES_SUCCESS :
            return {
                ...state,
                items : action.payload.data,
                isLoading : false,
                error : null,
                obj_tasks : null
            }

        case OBJECTIVE_TASKS_SUCCESS :
            return {
                ...state,
                obj_tasks : action.payload,
                isLoading : false,
                error : null
            }
        
        case ADD_OBJECTIVE_SUCCESS :
        case EDIT_OBJECTIVE_SUCCESS :
        case DELETE_OBJECTIVE_SUCCESS :
            return {
                ...state,
                item : action.payload.message,
                isLoading : false
            }

        case OBJECTIVE_FAIL :
            return {
                ...state,
                isLoading: false,
                items : null,
                error: action.payload.message
            }

        case OBJECTIVE_TASKS_FAIL :
            return {
                ...state,
                isLoading: false,
                obj_tasks : null,
                error: action.payload.message
            }

        case ALL_OBJECTIVES_FAIL :
            return {
                ...state,
                isLoading: false,
                obj_tasks : null,
                error: action.payload.message
            }
        
        case ADD_OBJECTIVE_FAIL :
        case EDIT_OBJECTIVE_FAIL :
        case DELETE_OBJECTIVE_FAIL :
            return {
                ...state,
                isLoading: false,
                item : null,
                error: action.payload.message
            }
        
        default : return state;
    }
}