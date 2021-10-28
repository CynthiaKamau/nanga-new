import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import error from './error';
import auth from './auth';
import kpi from "./kpi";
import objective from "./objective";
import task from "./task";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'kpi', 'objective', 'task']
}

const rootReducer = combineReducers({
    error : error,
    auth : auth,
    kpi : kpi,
    objective : objective,
    task : task
})

export default persistReducer(persistConfig, rootReducer);