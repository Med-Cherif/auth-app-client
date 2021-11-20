import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { getUsers } from '../redux/actions/userAction'
import { RootState } from '../redux/store'

const Home = () => {
    const { users, isLoading, error } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const getAllUsers = () => {
        dispatch(getUsers())
    }
    
    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: "center", margin: "20px 0" }}>For testing refresh Token</h1>
            <button style={{
                padding: "6px 12px", border: "1px solid #000", outline: "none", fontSize: 14, fontWeight: 600
            }} onClick={getAllUsers}>Get users</button>
            {
                isLoading ? <h2>Loading...</h2> : error ? (
                    <h2>{error}</h2>
                ) : <div>
                        {users?.map((user) => (
                            <div key={user._id}>{user?.username}</div>
                        ))}
                    </div>
            }
        </div>
    )
}

export default Home
