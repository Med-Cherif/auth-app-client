import axios from "axios";

const authApi = process.env.REACT_APP_API_URL + '/api/auth'

export interface SigninData {
    username: string;
    password: string;
}

export interface SignupData extends SigninData {
    email: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export interface AuthData extends SignupData {
    gender: string
    country?: string;
    city?: string;
    birthday?: string;
    profilePicture?: string;
}

export interface SignupStep3Data {
    country?: string;
    city?: string;
    gender: "male" | "female" | "prefer not to say";
}

export const signupStep1 = (infos: SignupData) => axios.post(authApi + '/register/step1', infos)
export const signupStep2 = (birthday: `${number}/${number}/${number}`) => axios.post(authApi + '/register/step2', { birthday })
export const signupStep3 = (signupStep3Data: SignupStep3Data) => axios.post(authApi + '/register/step3', signupStep3Data)
export const choosingProfilePicture = (profilePicture: FormData) => axios.post(authApi + '/register/step4', profilePicture)
export const signup = (signupData: AuthData) => axios.post(authApi + '/register', signupData)

export const getNewAccessToken = (refreshToken: string) => axios.post(authApi + '/refresh-token', { refreshToken })
export const signin = (signinData: SigninData) => axios.post(authApi + '/login', signinData)
export const signout = (userId: string) => axios.get(authApi + `/logout/${userId}`)

export const googleSignin = (idToken: string) => axios.post(authApi + '/google-signin', { idToken })
export const facebookSignin = (userID: string, accessTokenFacebook: string) => axios.post(authApi + '/facebook-signin', { userID, accessTokenFacebook })

export const confirmEmail = (email: string, token: string) => axios.get(`${authApi}/confirmation/${email}/${token}`)
export const resendLink = (email: string) => axios.post(authApi + '/resend-link', { email })