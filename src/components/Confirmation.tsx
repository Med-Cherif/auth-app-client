import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import queryString from "querystring";
import "./Confirmation.css";
import { confirmEmailAction } from "../redux/actions/authActions";

const Confirmation = () => {
    const { isLoading, errors } = useSelector((state: RootState) => state.auth)
    const { email, token }: { email: string, token: string } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(confirmEmailAction(token, email))
    }, [])
    
    return (
        <div className="confirmation">
            {
                isLoading ? <div className="confirmation-spinner"></div> : errors && <>
                    <div>
                        <Link to="/checking/confirmation">Go to this page to resend a link</Link> 
                    </div> 
                </>
            }
        </div>
    )
}

export default Confirmation
