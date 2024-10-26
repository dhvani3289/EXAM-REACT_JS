import { LOGIN ,GET_USER_DATA} from "../ActionType"


export const userLogin = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}


export const getUserData = () => {
    return {
        type: GET_USER_DATA
    }
}
