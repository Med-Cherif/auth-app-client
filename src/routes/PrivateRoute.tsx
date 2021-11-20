import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { RootState } from '../redux/store'

const PrivateRoute = ({children, ...rest}: any) => {
    const { accessToken } = useSelector((state: RootState) => state.auth)
    const { userData } = useSelector((state: RootState) => state.user)
    
    return (
        <Route 
            {...rest}
            render={() => {
                if (accessToken) {
                    if (userData?.isActive === false) {
                        return <Redirect to="/checking/confirmation" />
                    }
                    return children
                }
                else {
                    return <Redirect to="/login" />
                }
            }}
        />
    )
}

export default PrivateRoute