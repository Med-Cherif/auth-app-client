import { createSlice } from "@reduxjs/toolkit";
import { getAccessToken, getAuthData, getRefreshToken } from "../../utils/authHelpers"

interface AuthStateType {
    isLoading: boolean,
    errors: string | string[] | null,
    authData: any,
    step: number,
    allSteps: 5,
    accessToken: string | null;
    refreshToken: string | null;
}

const authState: AuthStateType = {
    isLoading: false,
    errors: null,
    authData: {},
    step: 1,
    allSteps: 5,
    accessToken: getAccessToken() || null,
    refreshToken: getRefreshToken() || null,
}

export const authReducer = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        loading: (state) => {
            state.isLoading = true
            state.errors = null
        },
        error: (state, action) => {
            state.isLoading = false
            state.errors = action.payload
            console.log(action.payload)
        },
        prevStep: (state) => {
            state.step--
        },
        register1: (state, action) => {
            state.isLoading = false;
            state.step = action.payload.step;
            state.authData = action.payload.userData
        },
        register2: (state, action) => {
            const { step, birthday } = action.payload
            state.isLoading = false;
            state.step = step
            state.authData = {...state.authData, birthday}
        },

        register3: (state, action) => {
            const { gender, country, city, step } = action.payload
            state.isLoading = false;
            state.step = step
            state.authData = {...state.authData, 
                gender, country, city
            }
        },
        chooseProfilePicture: (state, action) => {
            const { profilePicturePath } = action.payload
            state.isLoading = false;
            state.authData = {...state.authData, 
                profilePicturePath
            }
        },
        register4: (state) => {
            state.step = 5
        },
        authSuccess: (state, action) => {
            const { accessToken, refreshToken } = action.payload
            state.isLoading = false
            state.errors = null
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            localStorage.setItem('auth-app', JSON.stringify({
                accessToken, refreshToken
            }))
            state.authData = {};
            state.step = 1;
        },
        logout: (state) => {
            state.accessToken = null
            state.refreshToken = null
            state.isLoading = false
            state.errors = null
            localStorage.removeItem('auth-app')
        },
    }
})

export const { 
    authSuccess, 
    error, 
    loading, 
    logout, 
    register1, 
    register2, 
    register3, 
    register4, 
    chooseProfilePicture, 
    prevStep } = authReducer.actions
export default authReducer.reducer