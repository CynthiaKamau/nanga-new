import {
    ALL_USERS_SUCCESS,
    ALL_USERS_FETCH_REQUEST,
    ALL_USERS_FAIL,

    USER_SUCCESS,
    USER_FETCH_REQUEST,
    USER_FAIL,

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
    item: [],
    error: [],
    isLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ALL_USERS_FETCH_REQUEST:
        case USER_FETCH_REQUEST:
        case ADD_USER_FETCH_REQUEST:
        case EDIT_USER_FETCH_REQUEST:
        case DELETE_USER_FETCH_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }
        case USER_SUCCESS:
        case ADD_USER_SUCCESS:
        case EDIT_USER_SUCCESS:
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                item: action.payload.message,
                isLoading: false
            }

        case ALL_USERS_FAIL:
            return {
                ...state,
                isLoading: false,
                items: null,
                error: action.payload
            }
        case USER_FAIL:
        case ADD_USER_FAIL:
        case EDIT_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                item: null,
                error: action.payload
            }

        default: return state;
    }
}