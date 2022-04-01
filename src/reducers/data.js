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

    ALL_PILLARS_SUCCESS,
    ALL_PILLARS_FETCH_REQUEST,
    ALL_PILLARS_FAIL,

    MISSION_SUCCESS,
    MISSION_FETCH_REQUEST,
    MISSION_FAIL,

    VISION_SUCCESS,
    VISION_FETCH_REQUEST,
    VISION_FAIL,

    EDIT_MISSION_SUCCESS,
    EDIT_MISSION_FETCH_REQUEST,
    EDIT_MISSION_FAIL,

    EDIT_VISION_SUCCESS,
    EDIT_VISION_FETCH_REQUEST,
    EDIT_VISION_FAIL,

    SPEC_USER_SUCCESS,
    SPEC_USER_FETCH_REQUEST,
    SPEC_USER_FAIL,

    TASK_COUNT_SUCCESS,
    TASK_COUNT_FETCH_REQUEST,
    TASK_COUNT_FAIL,

    OBJECTIVE_COUNT_SUCCESS,
    OBJECTIVE_COUNT_FETCH_REQUEST,
    OBJECTIVE_COUNT_FAIL,

    KPI_COUNT_SUCCESS,
    KPI_COUNT_FETCH_REQUEST,
    KPI_COUNT_FAIL,

    STRATEGIC_INTENT1_SUCCESS,
    STRATEGIC_INTENT1_FETCH_REQUEST,
    STRATEGIC_INTENT1_FAIL,

    STRATEGIC_INTENT2_SUCCESS,
    STRATEGIC_INTENT2_FETCH_REQUEST,
    STRATEGIC_INTENT2_FAIL,

    WEEKLY_REPORT_SUCCESS,
    WEEKLY_REPORT_FETCH_REQUEST,
    WEEKLY_REPORT_FAIL

} from '../actions/types';

const initialState = {
    categories : [],
    category : [],
    roles : [],
    role : [],
    statuses : [],
    spec_user : [],
    pillars : [],
    status : [],
    mission : [],
    vision : [],
    error : [],
    task_count : [],
    strategic_intent1 : [],
    strategic_intent2 : [],
    strategic_intent1_error : null,
    strategic_intent2_error : null,
    objective_count : [],
    kpi_count : [],
    weekly_report : [],
    weekly_report_error: [],
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
        case EDIT_VISION_FETCH_REQUEST :
        case ALL_PILLARS_FETCH_REQUEST :
        case SPEC_USER_FETCH_REQUEST :
        case TASK_COUNT_FETCH_REQUEST :
        case OBJECTIVE_COUNT_FETCH_REQUEST :
        case STRATEGIC_INTENT1_FETCH_REQUEST :
        case STRATEGIC_INTENT2_FETCH_REQUEST :
        case KPI_COUNT_FETCH_REQUEST :
        case WEEKLY_REPORT_FETCH_REQUEST :
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
        case STRATEGIC_INTENT1_SUCCESS :
            return {
                ...state,
                strategic_intent1 : action.payload,
                error : null
            }
        case STRATEGIC_INTENT2_SUCCESS :
            return {
                ...state,
                strategic_intent2 : action.payload,
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
        case ALL_PILLARS_SUCCESS :
            return {
                ...state,
                pillars : action.payload,
                error : null
            }
        case EDIT_MISSION_SUCCESS :
        case EDIT_VISION_SUCCESS :
            return {
                ...state,
                mission : action.payload.message,
                error : null
            }
        case MISSION_SUCCESS :
            return {
                ...state,
                mission : action.payload,
                error : null
            }
        case TASK_COUNT_SUCCESS :
            return {
                ...state,
                task_count : action.payload,
                error : null
            }
        case OBJECTIVE_COUNT_SUCCESS :
            return {
                ...state,
                objective_count : action.payload,
                error : null
            }

        case KPI_COUNT_SUCCESS :
            return {
                ...state,
                kpi_count : action.payload,
                error : null
            }

        case SPEC_USER_SUCCESS :
            return {
                ...state,
                spec_user : action.payload,
                error : null
            }

        case WEEKLY_REPORT_SUCCESS:
            return {
                ...state,
                weekly_report : action.payload.data,
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

        case WEEKLY_REPORT_FAIL:
            return {
                ...state,
                weekly_report_error : action.payload.message,
                error : null
            }
        
        case ALL_STATUS_FAIL :
            return {
                ...state,
                isLoading: false,
                statuses : null,
                error: action.payload.message
            }
        case ALL_PILLARS_FAIL :
            return {
                ...state,
                isLoading: false,
                pillars : null,
                error: action.payload.message
            }
        case SPEC_USER_FAIL :
            return {
                ...state,
                isLoading: false,
                spec_user : null,
                error: action.payload.message
            }
        case TASK_COUNT_FAIL :
            return {
                ...state,
                isLoading: false,
                task_count : null,
                error: action.payload.message
            }
        case OBJECTIVE_COUNT_FAIL :
            return {
                ...state,
                isLoading: false,
                objectives_count : null,
                error: action.payload.message
            }

        case KPI_COUNT_FAIL :
            return {
                ...state,
                isLoading: false,
                kpi_count : null,
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
            
        case EDIT_VISION_FAIL :     
        case VISION_FAIL :
            return {
                ...state,
                isLoading: false,
                vision: null,
                error: action.payload.message
            }

        case STRATEGIC_INTENT1_FAIL :
            return {
                ...state,
                isLoading : false,
                strategic_intent1 : null,
                strategic_intent1_error : action.payload.message
            }
  
        case STRATEGIC_INTENT2_FAIL :
            return {
                ...state,
                isLoading : false,
                strategic_intent2 : null,
                strategic_intent2_error : action.payload.message
            }
        
        default : return state;

    }
}
            

