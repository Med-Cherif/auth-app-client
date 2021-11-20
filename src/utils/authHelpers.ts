import jwtDecode from "jwt-decode";
import { getNewAccessToken } from "../apis/auth";
import { UserData } from "../redux/slices/user";
import { AppDispatch } from "../redux/store";

const nameAPP = "auth-app"

export const getAccessToken = () => {
    let token: any = localStorage.getItem(nameAPP)
    if (token === "null" || token === "undefined" || !token) {
        return null
    }
    token = JSON.parse(token);
    let accessToken = token?.accessToken;
    if (!accessToken) {
        return null;
    }

    return accessToken
}

export const getRefreshToken = () => {
    let token: any = localStorage.getItem(nameAPP)
    if (token === "null" || token === "undefined" || !token) {
        return null
    }
    token = JSON.parse(token);
    let refreshToken = token?.refreshToken;
    if (!refreshToken) {
        return null;
    }

    return refreshToken
}

export const getAuthData = (): UserData | {} => {
    const accessToken = getAccessToken()
    if (!accessToken) {
        return {}
    }

    return jwtDecode(accessToken);

}

export const getNewToken = async (refreshTkn: string) => {
    try {
        const { data } = await getNewAccessToken(refreshTkn)
        const { accessToken, refreshToken } = data
        return { accessToken, refreshToken }
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || error?.message)
    }
}

export function isAccessTokenExpired (user: any) {
    let isAccessTokenExpired = true
    if (user?.userData?.exp) {
        isAccessTokenExpired = user.userData.exp * 1000 <= Date.now()
    }
    return isAccessTokenExpired
}