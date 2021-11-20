import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { RootState } from '../redux/store'

const AuthRoute = ({children, ...rest}: any) => {
    const { accessToken } = useSelector((state: RootState) => state.auth)
    
    return (
        <Route
            {...rest}
            render={({location}) => {
                return accessToken ? <Redirect to="/" /> : children
            }}
        />
            
        
    )
}

export default AuthRoute
