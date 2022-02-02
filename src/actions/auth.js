import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    USER_FETCH_REQUEST,
    USER_FETCHED,
    LOGOUT,
    AUTH_ERROR
} from '../actions/types';
import AuthService from '../services/auth.service';


//check user and load user
export const getUser = (id) => {

    //user loading
    return async function (dispatch) {
        dispatch({ type: USER_FETCH_REQUEST })

        try {

            let response = await axios.get(`/users/findByUserId?user_id=${id}`)
            if (response.status == 200) {
                console.log("user res", response.data)
                dispatch({ type: USER_FETCHED, payload: response.data })
            } else {
                dispatch({ type: AUTH_ERROR, payload : response.data });
            }
            
        } catch (error) {
            dispatch({ type: AUTH_ERROR, payload : error.response.data });
        }
    }

}

//login
export const login = (code, session_state) => (dispatch) => {
    return AuthService.login(code, session_state)
    .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload:  res.data });
            //return Promise.resolve();
            return res.data;
        },
        (error) => {
            dispatch({ type: LOGIN_FAIL, payload: error.message });
            //return Promise.reject();
            return error;
        }
    )
}


// //login
// export const login = (username, password ) => {

//     const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

//     const body = JSON.stringify({username, password});

//     return async function (dispatch) {

//         dispatch({ type: LOGIN_REQUEST });

//         try {

//             let response = await axios.post('/authenticate', body, config)
//             console.log("here",response)
//             if (response.data.success === true) {
//                 dispatch({ type: LOGIN_SUCCESS, payload: response.data })
//             } else if(response.data.success === false) {
//                 dispatch({ type: LOGIN_FAIL, payload: response.data })
//             }
//         } catch (error) {
//             dispatch({ type: LOGIN_FAIL, payload: error.response.data })
//         }

//     }

// }

//logout
export const logout = (dispatch) => {
    return dispatch({ type: LOGOUT });
}

export const tokenConfig = getState => {

    //get token from local storage
    const token = getState().auth.token;

    //headers
    let config = { headers: { "Content-type": "application/json"}}

    //if token add to headers
    if (token) {config.headers['Authorization'] = `Bearer ${token}`;}

    return config;

}