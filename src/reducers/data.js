import {
    ALL_ROLES_SUCCESS,
    ALL_ROLES_FETCH_REQUEST,
    ALL_ROLES_FAIL,

    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FETCH_REQUEST,
    ALL_CATEGORIES_FAIL,

    ALL_STATUS_SUCCESS,
    ALL_STATUS_FETCH_REQUEST,
    ALL_STATUS_FAIL,

    MISSION_SUCCESS,
    MISSION_FETCH_REQUEST,
    MISSION_FAIL,

    VISION_SUCCESS,
    VISION_FETCH_REQUEST,
    VISION_FAIL,

    EDIT_MISSION_SUCCESS,
    EDIT_MISSION_FETCH_REQUEST,
    EDIT_MISSION_FAIL,

} from '../actions/types';

const initialState = {
    categories : [],
    category : [],
    roles : [],
    role : [],
    statuses : [],
    status : [],
    mission : [],
    vision : [],
    error : [],
    isLoading : false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ALL_CATEGORIES_FETCH_REQUEST :
        case ALL_ROLES_FETCH_REQUEST :
        case ALL_STATUS_FETCH_REQUEST :
        case VISION_FETCH_REQUEST :
        case MISSION_FETCH_REQUEST :
        case EDIT_MISSION_FETCH_REQUEST :
            return {
                ...state,
                isLoading: true
            }

        case ALL_CATEGORIES_SUCCESS :
            return {
                ...state,
                categories : action.payload,
                error : null
            }
        case ALL_ROLES_SUCCESS : 
            return {
                ...state,
                roles : action.payload,
                error : null
            }
        case ALL_STATUS_SUCCESS :
            return {
                ...state,
                statuses : action.payload,
                error : null
            }
        case EDIT_MISSION_SUCCESS :
        case MISSION_SUCCESS :
            return {
                ...state,
                mission : action.payload,
                error : null
            }
        case VISION_SUCCESS :
            return {
                ...state,
                vision : action.payload,
                error : null
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
        case EDIT_MISSION_FAIL :    
        case MISSION_FAIL :
            return {
                ...state,
                isLoading: false,
                mission: null,
                error: action.payload.message
            }

        case VISION_FAIL :
            return {
                ...state,
                isLoading: false,
                vision: null,
                error: action.payload.message
            }
        
        default : return state;

    }
}
            

