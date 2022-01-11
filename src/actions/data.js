import axios from 'axios';
import {
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FETCH_REQUEST,
    ALL_CATEGORIES_FAIL,

    ALL_ROLES_SUCCESS,
    ALL_ROLES_FETCH_REQUEST,
    ALL_ROLES_FAIL,

    ALL_STATUS_SUCCESS,
    ALL_STATUS_FETCH_REQUEST,
    ALL_STATUS_FAIL,

    ALL_PILLARS_SUCCESS,
    ALL_PILLARS_FETCH_REQUEST,
    ALL_PILLARS_FAIL,

    MISSION_SUCCESS,
    MISSION_FETCH_REQUEST,
    MISSION_FAIL,

    SPEC_USER_SUCCESS,
    SPEC_USER_FETCH_REQUEST,
    SPEC_USER_FAIL,

    VISION_SUCCESS,
    VISION_FETCH_REQUEST,
    VISION_FAIL,

    EDIT_MISSION_SUCCESS,
    EDIT_MISSION_FETCH_REQUEST,
    EDIT_MISSION_FAIL,

    EDIT_VISION_SUCCESS,
    EDIT_VISION_FETCH_REQUEST,
    EDIT_VISION_FAIL,

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

} from './types';

//all categories
export const getCategories = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_CATEGORIES_FETCH_REQUEST });

        try {

            let response = await axios.get('/categories/all_categories')
            if (response.status == 200) {
                dispatch({ type: ALL_CATEGORIES_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_CATEGORIES_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_CATEGORIES_FAIL, payload: error.response.data })
        }
    }
}

//all roles
export const getRoles = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_ROLES_FETCH_REQUEST });

        try {

            let response = await axios.get('/roles')
            if (response.status == 200) {
                dispatch({ type: ALL_ROLES_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_ROLES_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_ROLES_FAIL, payload: error.response })
        }
    }
}

//all status
export const getStatus = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_STATUS_FETCH_REQUEST });

        try {

            let response = await axios.get('/statuses/all_statuses')
            if (response.status == 200) {
                dispatch({ type: ALL_STATUS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_STATUS_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_STATUS_FAIL, payload: error.response })
        }
    }
}

//all pillars
export const getPillars = () => {

    return async function (dispatch) {

        dispatch({ type: ALL_PILLARS_FETCH_REQUEST });

        try {

            let response = await axios.get('/pillarObjectives/all_pillarObjectives')
            if (response.status == 200) {
                dispatch({ type: ALL_PILLARS_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: ALL_PILLARS_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: ALL_PILLARS_FAIL, payload: error.response })
        }
    }
}

//user mission
export const getMission = (id) => {

    return async function (dispatch) {

        dispatch({ type: MISSION_FETCH_REQUEST });

        try {

            let response = await axios.get(`/missions/fetchMissionbyUserId?user_id=${id}`)
            if (response.status == 200) {
                console.log("here", response.data)
                dispatch({ type: MISSION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: MISSION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: MISSION_FAIL, payload: error.response })
        }
    }
}

//edit user mission
export const editMission = (user_id, usermission) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    return async function (dispatch) {

        dispatch({ type: EDIT_MISSION_FETCH_REQUEST });

        const body = JSON.stringify({
            id : user_id,
            description : usermission
         });

        try {

            let response = await axios.post('/missions/update', body, config)
            if (response.status == 200) {
                dispatch({ type: EDIT_MISSION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: EDIT_MISSION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: EDIT_MISSION_FAIL, payload: error.response })
        }
    }
}

//user vision
export const getVision = (id) => {

    return async function (dispatch) {

        dispatch({ type: VISION_FETCH_REQUEST });

        try {

            let response = await axios.get(`vision/fetchVisionbyUserId?user_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: VISION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: VISION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: VISION_FAIL, payload: error.response.data })
        }
    }
}

//edit user vision
export const editVision = (user_id, uservision) => {

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    return async function (dispatch) {

        dispatch({ type: EDIT_VISION_FETCH_REQUEST });

        const body = JSON.stringify({
            id : user_id,
            description : uservision
         });

        try {

            let response = await axios.post('/vision/update', body, config)
            if (response.status == 200) {
                dispatch({ type: EDIT_VISION_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: EDIT_VISION_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: EDIT_VISION_FAIL, payload: error.response })
        }
    }
}

//user mission
export const getUserById = (id) => {

    return async function (dispatch) {

        dispatch({ type: SPEC_USER_FETCH_REQUEST });

        try {

            let response = await axios.get(`/users/findByUserId?user_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: SPEC_USER_SUCCESS, payload: response.data.data })
            } else {
                dispatch({ type: SPEC_USER_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: SPEC_USER_FAIL, payload: error.response })
        }
    }
}

//user task count
export const getTaskCount = (id) => {

    return async function (dispatch) {

        dispatch({ type: TASK_COUNT_FETCH_REQUEST });

        try {

            let response = await axios.get(`/tasks/fetchGroupedTasksbyStatus?user_id=${id}`)
            if (response.status == 200) {
                console.log("here", response.data)
                dispatch({ type: TASK_COUNT_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: TASK_COUNT_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: TASK_COUNT_FAIL, payload: error.response })
        }
    }
}

//user objective count
export const getObjectivesCount = (id) => {

    return async function (dispatch) {

        dispatch({ type: OBJECTIVE_COUNT_FETCH_REQUEST });

        try {

            let response = await axios.get(`/objectives/fetchGroupedObjectivesbyOverallStatus?user_id=${id}`)
            if (response.status == 200) {
                console.log("here", response.data)
                dispatch({ type: OBJECTIVE_COUNT_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: OBJECTIVE_COUNT_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: OBJECTIVE_COUNT_FAIL, payload: error.response })
        }
    }
}

//user kpi count
export const getKpiCount = (id) => {

    return async function (dispatch) {

        dispatch({ type: KPI_COUNT_FETCH_REQUEST });

        try {

            let response = await axios.get(`/kpi/kpiPieChart?user_id=${id}`)
            if (response.status == 200) {
                dispatch({ type: KPI_COUNT_SUCCESS, payload: response.data.data })
            } else {
                dispatch({ type: KPI_COUNT_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: KPI_COUNT_FAIL, payload: error.response })
        }
    }
}


//strategic intent1
export const getStrategicIntent1 = (id) => {

    return async function (dispatch) {

        dispatch({ type: STRATEGIC_INTENT1_FETCH_REQUEST });

        try {

            let response = await axios.get(`strategicintent/fetchStrategicIntentbyUserId?user_id=${id}`)
            if (response.status == 200) {
                console.log("here", response.data)
                dispatch({ type: STRATEGIC_INTENT1_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: STRATEGIC_INTENT1_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: STRATEGIC_INTENT1_FAIL, payload: error.response })
        }
    }

}

//strategic intent2
export const getStrategicIntent2 = (id) => {

    return async function (dispatch) {

        dispatch({ type: STRATEGIC_INTENT2_FETCH_REQUEST });

        try {

            let response = await axios.get(`?user_id=${id}`)
            if (response.status == 200) {
                console.log("here", response.data)
                dispatch({ type: STRATEGIC_INTENT2_SUCCESS, payload: response.data })
            } else {
                dispatch({ type: STRATEGIC_INTENT2_FAIL, payload: response.data })
            }

        } catch (error) {
            dispatch({ type: STRATEGIC_INTENT2_FAIL, payload: error.response })
        }
    }

}




