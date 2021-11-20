import * as slices from "../slices/user";
import * as api from "../../apis/user";
import { AppDispatch, RootState } from "../store";
import { isAccessTokenExpired, getNewToken } from "../../utils/authHelpers";
import { authSuccess } from "../slices/auth";
import jwtDecode from "jwt-decode";


const errorsHandler = (err: any) => {
    const error = err?.response?.data.message || err.message
    console.log(error)
    return error
}

export const getUsers = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth: { accessToken: accessTkn, refreshToken: refreshTkn }, user } = getState()
    
    if (accessTkn && refreshTkn) {
        
        const isTokenExpired = isAccessTokenExpired(user)
        if (isTokenExpired) {
            console.log("expired---------- Get new")
            const { accessToken, refreshToken } = await getNewToken(refreshTkn)
            dispatch(authSuccess({ accessToken, refreshToken }))
            dispatch(slices.getUserData(jwtDecode(accessToken)))
            return getUsers
        }
        
        
        api.sendAccessToken(accessTkn)
        dispatch(slices.loading())
        try {
            const { data } = await api.getAllUsers()
            dispatch(slices.getAllUsers(data.users))
        } catch (error) {
            dispatch(slices.error(errorsHandler(error)))
        }
    }
}