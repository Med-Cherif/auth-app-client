import { createSlice } from "@reduxjs/toolkit";
import { getAuthData } from "../../utils/authHelpers"


export interface UserData {
    email?: string;
    firstName?: string;
    iat?: number;
    exp?: number;
    lastName?: string;
    userId?: string;
    username?: string;
    profilePicture?: string;
    isActive?: boolean
}

interface InitState {
    isLoading: boolean;
    error: any;
    userData: UserData;
    users: any[];
}

const initialState: InitState = {
    isLoading: false,
    error: null,
    userData: getAuthData() ? getAuthData() : {},
    users: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loading: (state) => {
            state.error = null
            state.isLoading = true
        },
        error: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        getUserData: (state, action) => {
            state.isLoading = false
            state.userData = action.payload
        },
        resetUserData: (state) => {
            state.error = null;
            state.isLoading = false;
            state.userData = {};
            state.users = [];
        },
        getAllUsers: (state, action) => {
            state.isLoading = false
            state.users = action.payload
        }
    }
})

export const { getUserData, resetUserData, getAllUsers, loading, error } = userSlice.actions;

export default userSlice.reducer;