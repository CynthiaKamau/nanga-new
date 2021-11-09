import {
    ALL_TEAMS_SUCCESS,
    ALL_TEAMS_FETCH_REQUEST,
    ALL_TEAMS_FAIL,

    TEAM_SUCCESS,
    TEAM_FETCH_REQUEST,
    TEAM_FAIL,

    ADD_TEAM_SUCCESS,
    ADD_TEAM_FETCH_REQUEST,
    ADD_TEAM_FAIL,

    EDIT_TEAM_SUCCESS,
    EDIT_TEAM_FETCH_REQUEST,
    EDIT_TEAM_FAIL,

    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FETCH_REQUEST,
    DELETE_TEAM_FAIL
} from '../actions/types';

const initialState = {
    items : [],
    item: [],
    error : [],
    isLoading : false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ALL_TEAMS_FETCH_REQUEST : 
        case TEAM_FETCH_REQUEST :
        case ADD_TEAM_FETCH_REQUEST :
        case EDIT_TEAM_FETCH_REQUEST :
        case DELETE_TEAM_FETCH_REQUEST :
            return {
                ...state,
                isLoading: true
            }

        case ALL_TEAMS_SUCCESS :
            return {
                ...state,
                items : action.payload,
                isLoading : false,
                error : null
            }
        case TEAM_SUCCESS :
        case ADD_TEAM_SUCCESS :
        case EDIT_TEAM_SUCCESS :
        case DELETE_TEAM_SUCCESS :
            return {
                ...state,
                item : action.payload,
                isLoading : false,
                error : null
            }

        case ALL_TEAMS_FAIL :
            return {
                ...state,
                isLoading: false,
                items : null,
                error: action.payload.message
            }
        case TEAM_FAIL :
        case ADD_TEAM_FAIL :
        case EDIT_TEAM_FAIL :
        case DELETE_TEAM_FAIL :
            return {
                ...state,
                isLoading: false,
                item : null,
                error: action.payload.message
            }
        
        default : return state;
    }
}