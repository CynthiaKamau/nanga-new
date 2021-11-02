import {
    ALL_TASKS_SUCCESS,
    ALL_TASKS_FETCH_REQUEST,
    ALL_TASKS_FAIL,

    ALL_ASSIGNED_TASKS_SUCCESS,
    ALL_ASSIGNED_TASKS_FAIL,
    ALL_ASSIGNED_TASKS_FETCH_REQUEST,
    
    TASK_SUCCESS,
    TASK_FETCH_REQUEST,
    TASK_FAIL,

    ASSIGNED_TASK_SUCCESS,
    ASSIGNED_TASK_FAIL,
    ASSIGNED_TASK_FETCH_REQUEST,

    ADD_TASK_SUCCESS,
    ADD_TASK_FETCH_REQUEST,
    ADD_TASK_FAIL,

    ADD_ASSIGNED_TASK_FAIL,
    ADD_ASSIGNED_TASK_SUCCESS,
    ADD_ASSIGNED_TASK_FETCH_REQUEST,

    EDIT_TASK_SUCCESS,
    EDIT_TASK_FETCH_REQUEST,
    EDIT_TASK_FAIL,

    EDIT_ASSIGNED_TASK_FAIL,
    EDIT_ASSIGNED_TASK_FETCH_REQUEST,
    EDIT_ASSIGNED_TASK_SUCCESS,

    DELETE_TASK_SUCCESS,
    DELETE_TASK_FETCH_REQUEST,
    DELETE_TASK_FAIL,

    DELETE_ASSIGNED_TASK_FAIL,
    DELETE_ASSIGNED_TASK_FETCH_REQUEST,
    DELETE_ASSIGNED_TASK_SUCCESS

} from '../actions/types';

const initialState = {
    items : [],
    item: [],
    error : [],
    isLoading : false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ALL_TASKS_FETCH_REQUEST : 
        case ALL_ASSIGNED_TASKS_FETCH_REQUEST :
        case TASK_FETCH_REQUEST :
        case ASSIGNED_TASK_FETCH_REQUEST :
        case ADD_TASK_FETCH_REQUEST :
        case ADD_ASSIGNED_TASK_FETCH_REQUEST :
        case EDIT_TASK_FETCH_REQUEST :
        case EDIT_ASSIGNED_TASK_FETCH_REQUEST :
        case DELETE_TASK_FETCH_REQUEST :
        case DELETE_ASSIGNED_TASK_FETCH_REQUEST :
            return {
                ...state,
                isLoading: true
            }

        case ALL_TASKS_SUCCESS :
        case ALL_ASSIGNED_TASKS_SUCCESS :
            return {
                ...state,
                items : action.payload,
                isLoading : false
            }
        case TASK_SUCCESS :
        case ASSIGNED_TASK_SUCCESS :
        case ADD_TASK_SUCCESS :
        case ADD_ASSIGNED_TASK_SUCCESS :
        case EDIT_TASK_SUCCESS :
        case EDIT_ASSIGNED_TASK_SUCCESS :
        case DELETE_TASK_SUCCESS :
        case DELETE_ASSIGNED_TASK_SUCCESS :
            return {
                ...state,
                item : action.payload.message,
                isLoading : false
            }

        case ALL_TASKS_FAIL :
        case ALL_ASSIGNED_TASKS_FAIL :
            return {
                ...state,
                isLoading: false,
                items : null,
                error: action.payload.message
            }
        case TASK_FAIL :
        case ASSIGNED_TASK_FAIL :
        case ADD_TASK_FAIL :
        case ADD_ASSIGNED_TASK_FAIL :
        case EDIT_TASK_FAIL :
        case EDIT_ASSIGNED_TASK_FAIL :
        case DELETE_TASK_FAIL :
        case DELETE_ASSIGNED_TASK_FAIL :
            return {
                ...state,
                isLoading: false,
                item : null,
                error: action.payload.message
            }
        
        default : return state;
    }
}