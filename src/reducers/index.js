import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import error from './error';
import auth from './auth';
import kpi from "./kpi";
import objective from "./objective";
import task from "./task";
import user from "./user";
import team from "./team";
import data from "./data";
import bfc from "./bfc";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'kpi', 'user', 'team', 'data', 'bfc']
}

const rootReducer = combineReducers({
    error : error,
    auth : auth,
    kpi : kpi,
    objective : objective,
    task : task,
    user : user,
    team : team,
    data : data,
    bfc : bfc
});


export default persistReducer(persistConfig, rootReducer);