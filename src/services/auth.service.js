import axios from 'axios';

class AuthService {
    login = (username, password) => {
        return axios.post("/authenticate", {username, password })
        .then((response) => {return response})
    }

}    

export default new AuthService();