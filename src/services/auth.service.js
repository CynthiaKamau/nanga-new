import axios from 'axios';

class AuthService {

    // const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    login = (code, session_state) => {
        return axios.get(`/fetchTokenfromCode?code=${code}&session_state=${session_state}`,
            { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
        )
        .then((response) => {return response})
    }

}    

export default new AuthService();