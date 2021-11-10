import axios from 'axios';
// import { setError } from './error';
// import { tokenConfig } from './auth';
import {
    ALL_TEAMS_SUCCESS,
    ALL_TEAMS_FETCH_REQUEST,
    ALL_TEAMS_FAIL,

    TEAM_SUCCESS,
    TEAM_FAIL,
    TEAM_FETCH_REQUEST,

    ADD_TEAM_SUCCESS,
    ADD_TEAM_FETCH_REQUEST,
    ADD_TEAM_FAIL,

    EDIT_TEAM_SUCCESS,
    EDIT_TEAM_FETCH_REQUEST,
    EDIT_TEAM_FAIL,

    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FETCH_REQUEST,
    DELETE_TEAM_FAIL,

} from '../actions/types';

export const getTeams = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_TEAMS_FETCH_REQUEST });

        try {

            let response = await axios.get('/teams/all_teams')
            if (response.status == 200) {
                dispatch({ type: ALL_TEAMS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_TEAMS_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_TEAMS_FAIL, payload: error.response.data.message })
        }
    }
}

//get specific team
export const getTeam = (id) => {

    return async function (dispatch) {

        dispatch({ type: TEAM_FETCH_REQUEST });

        try {

            let response = await axios.get(`teams/findteamByUserId?${id}`)
            if (response.status == 200) {
                dispatch({ type: TEAM_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: TEAM_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: TEAM_FAIL, payload: error.response.data.message })
        }
    }

}

//add specific team
export const addTeam = (name, teamlead, isparent, parentId) => {

    const config = { headers: { 'Content-Type': 'application/json' } }
    
    const body = JSON.stringify({ name, teamlead, isparent, parentId });
    console.log("team", body);

    return async function (dispatch) {

        dispatch({ type: ADD_TEAM_FETCH_REQUEST});

        try {

            let response = await axios.post('/teams/create', body, config)
            if (response.status == 200) {
                dispatch({ type: ADD_TEAM_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ADD_TEAM_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_TEAM_FAIL, payload: error })
        }

    }

}

//edit specific team
export const editTeam = (id, name, teamlead, isparent, parentId, updated_by ) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    const body = JSON.stringify({ 
        id : id,
        team_name : name,
        team_lead : teamlead,
        is_parent : isparent,
        parent_team_id : parentId,
        updated_by_id : updated_by });
    console.log("team", body);

    return async function (dispatch) {

        dispatch({ type: EDIT_TEAM_FETCH_REQUEST});

        try {

            let response = await axios.post('/teams/update', body, config)
            if (response.status == 201) {
                dispatch({ type: EDIT_TEAM_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: EDIT_TEAM_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: EDIT_TEAM_FAIL, payload: error.response.data })
        }

    }

}

//delete specific team
export const deleteTeam = (id) => {
    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    const body = JSON.stringify({ id });
    console.log("team", body);

    return async function (dispatch) {

        dispatch({ type: DELETE_TEAM_FETCH_REQUEST});

        try {

            let response = await axios.post(`/teams/delete`, body, config)
            if (response.status == 200) {
                dispatch({ type: DELETE_TEAM_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: DELETE_TEAM_FAIL, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: ADD_TEAM_FAIL, payload: error.response.data.message })
        }

    }
}

