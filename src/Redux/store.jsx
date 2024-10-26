import { combineReducers, createStore } from "redux";
import { loginReducer } from "./Reducers/LoginReducers";

const rootReducer = combineReducers({
    loginRoot: loginReducer
})

const store = createStore(rootReducer)
export default store;