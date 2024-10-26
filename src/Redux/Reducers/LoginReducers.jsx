import { LOGIN, GET_USER_DATA } from "../ActionType";

const initialValue = {
    loginDetails: {}
}

export const loginReducer = (state = initialValue, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem("user", JSON.stringify(action.payload))
            return { ...state, loginDetails: action.payload };

        case GET_USER_DATA:
            let userData = JSON.parse(localStorage.getItem("user"))
            return { ...state, loginDetails: userData != null ? userData : {} }

        default:
            return state;
    }
}