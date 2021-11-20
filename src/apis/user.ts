import axios from "axios";

const userApi = process.env.REACT_APP_API_URL + '/api/users';
const instance = axios.create({
    baseURL: userApi,
});

export const sendAccessToken = (accessToken: string) => {
    return instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export const getAllUsers = () => instance.get('/')