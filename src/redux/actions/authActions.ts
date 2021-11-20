import { loading, error, authSuccess, register1, register2, register3, register4, chooseProfilePicture, logout } from "../slices/auth";
import { AppDispatch, RootState } from "../store";
import { SigninData, SignupData, signin, signup, signupStep1, signupStep2, SignupStep3Data, signupStep3, choosingProfilePicture, googleSignin, facebookSignin, signout, confirmEmail, resendLink } from "../../apis/auth"
import { resetUserData, getUserData } from "../slices/user";
import jwtDecode from "jwt-decode";

const handleErrors = (error: any) => {
    const err = error?.response?.data?.message || "Something went wrong in our server"
    console.log(err)
    return err
}

export const registerStep1 = (infos: SignupData) => async (dispatch: AppDispatch) => {
    dispatch(loading())
    try {
        const { data } = await signupStep1(infos)
        dispatch(register1({
            step: data.step,
            userData: data.userData
        }))
    } catch (err) {
        dispatch(error(handleErrors(err)))
    }
}

export const registerStep2 = (birthday: `${number}/${number}/${number}`) => async (dispatch: AppDispatch) => {
    dispatch(loading())
    try {
        const { data } = await signupStep2(birthday)
        dispatch(register2({
            step: data.step,
            birthday: data.birthday
        }))
    } catch (err) {
        dispatch(error(handleErrors(err)))
    }
}

export const registerStep3 = (signupStep3Data: SignupStep3Data) => async (dispatch: AppDispatch) => {
    dispatch(loading())
    try {
        const { data } = await signupStep3(signupStep3Data)
        const { country, city, gender, step } = data
        dispatch(register3({
            step, gender, country, city
        }))
    } catch (err) {
        dispatch(error(handleErrors(err)))
    }
}

export const choosingProfilePictureAction = (profilePicture: FormData) => async (dispatch: AppDispatch) => {

    dispatch(loading())
    try {
        const { data } = await choosingProfilePicture(profilePicture)
        const { path } = data
        dispatch(chooseProfilePicture({
            profilePicturePath: path
        }))
    } catch (err) {
        dispatch(error(handleErrors(err)))
    }
}

export const registerStep4 = () => async (dispatch: AppDispatch) => {
    dispatch(register4())
}

export const register = () => async (dispatch: AppDispatch, getState: any) => {
    const { auth }: any = getState()

    dispatch(loading())
    try {
        const { data } = await signup(auth.authData)
        const { accessToken, refreshToken } = data
        dispatch(authSuccess({
            accessToken, refreshToken
        }))
        dispatch(getUserData(jwtDecode(accessToken)))
    } catch (err) {
        dispatch(error(handleErrors(err)))
    }
}

export const googleLogin = (idToken: string) => async (dispatch: AppDispatch) => {
    dispatch(loading())
    try {
        const { data } = await googleSignin(idToken)
        const { accessToken, refreshToken } = data
        dispatch(authSuccess({
            accessToken, refreshToken
        }))
        dispatch(getUserData(jwtDecode(accessToken)))
    } catch (err) {
        dispatch(error(handleErrors(err)))
    }
}

export const facebookLogin = (userID: string, accessTokenFacebook: string) => async (dispatch: AppDispatch) => {
    dispatch(loading())
    try {
        const { data } = await facebookSignin(userID, accessTokenFacebook)
        const { accessToken, refreshToken } = data
        dispatch(authSuccess({
            accessToken, refreshToken
        }))
        dispatch(getUserData(jwtDecode(accessToken)))
    } catch (err) {
        dispatch(error(handleErrors(err)))
    }
}


export const login = (signinData: SigninData) => async (dispatch: AppDispatch) => {
    dispatch(loading())
    try {
        const { data } = await signin(signinData)
        const { accessToken, refreshToken } = data
        dispatch(authSuccess({
            accessToken, refreshToken
        }))
        dispatch(getUserData(jwtDecode(accessToken)))
    } catch (err) {
        dispatch(error(handleErrors(err)))
    }
}


export const logoutAction = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState()
    dispatch(loading())
    try {
        if (user.userData?.userId) {
            await signout(user.userData.userId)
            dispatch(logout())
            dispatch(resetUserData())
            window.location.pathname = "/login"
        }
    } catch (err) {
        dispatch(error(handleErrors(err)))
    }
}

export const confirmEmailAction = (token: string, eMail: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(loading())
    const { user: { userData: { email } } } = getState()
    if (email !== eMail) {
        return;
    }
    try {
        const { data } = await confirmEmail(email, token)
        const { accessToken, refreshToken } = data
        dispatch(authSuccess({
            accessToken, refreshToken
        }))
        dispatch(getUserData(jwtDecode(accessToken)))
        window.location.pathname = "/"
    } catch (err) {
        dispatch(error(handleErrors(err)))
    }
}

export const resendLinkAction = (cb: () => void) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(loading())
    const { user: { userData: { email } } } = getState()
    if (!email) return;
    try {
        await resendLink(email)
        cb()
    } catch (err) {
        dispatch(error(handleErrors(err)))
    }
}
