import {
    ALL_USERS_SUCCESS,
    ALL_USERS_FETCH_REQUEST,
    ALL_USERS_FAIL,

    ALL_RESOURCE_USERS_SUCCESS,
    ALL_RESOURCE_USERS_FETCH_REQUEST,
    ALL_RESOURCE_USERS_FAIL,

    USER_SUCCESS,
    USER_FETCH_REQUEST,
    USER_FAIL,

    USER_TEAM_SUCCESS,
    USER_TEAM_FETCH_REQUEST,
    USER_TEAM_FAIL,

    ADD_USER_SUCCESS,
    ADD_USER_FETCH_REQUEST,
    ADD_USER_FAIL,

    EDIT_USER_SUCCESS,
    EDIT_USER_FETCH_REQUEST,
    EDIT_USER_FAIL,

    DELETE_USER_SUCCESS,
    DELETE_USER_FETCH_REQUEST,
    DELETE_USER_FAIL
} from '../actions/types';

const initialState = {
    items: [],
    sys_resources: [],
    user_teamates: [],
    user_teamates_error: [],
    item: [],
    error: [],
    isLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ALL_USERS_FETCH_REQUEST:
        case ALL_RESOURCE_USERS_FETCH_REQUEST:
        case USER_FETCH_REQUEST:
        case ADD_USER_FETCH_REQUEST:
        case EDIT_USER_FETCH_REQUEST:
        case DELETE_USER_FETCH_REQUEST:
        case USER_TEAM_FETCH_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                isLoading: false,
                error: null
            }

        case USER_TEAM_SUCCESS:
            return {
                ...state,
                user_teamates: action.payload,
                isLoading: false,
                user_teamates_error: null
            }

        case ALL_RESOURCE_USERS_SUCCESS:
            return {
                ...state,
                sys_resources: action.payload,
                isLoading: false,
                error: null
            }

        case USER_SUCCESS:
        case ADD_USER_SUCCESS:
        case EDIT_USER_SUCCESS:
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                item: action.payload.message,
                isLoading: false,
                error: null
            }

        case ALL_USERS_FAIL:
            return {
                ...state,
                isLoading: false,
                items: null,
                error: action.payload.message
            }

        case USER_TEAM_FAIL:
            return {
                ...state,
                isLoading: false,
                user_teamates: null,
                user_teamates_error: action.payload.message
            }

        case ALL_RESOURCE_USERS_FAIL:
            return {
                ...state,
                isLoading: false,
                sys_resources: null,
                error: action.payload.message
            }

        case USER_FAIL:
        case ADD_USER_FAIL:
        case EDIT_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                item: null,
                error: action.payload.message
            }

        default: return state;
    }
}