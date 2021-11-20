import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { logoutAction } from "../redux/actions/authActions"
import { logout } from "../redux/slices/auth"
import { AppDispatch, RootState } from "../redux/store"
import "./Navbar.css"

const Navbar = () => {
    const dispatch = useDispatch()
    
    return (
        <div className="navbar">
            <h2>Bibo.</h2>
            <button onClick={() => dispatch(logoutAction())}>Logout</button>
        </div>
    )
}

export default Navbar
