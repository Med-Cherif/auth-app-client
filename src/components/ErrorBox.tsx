import { MdErrorOutline } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import "./ErrorBox.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLocation } from "react-router";

const ErrorBox = () => {

    const { errors } = useSelector((state: RootState) => state.auth)
    const location = useLocation()

    const [isBoxErrorVisible, setIsBoxErrorVisible] = useState(false)

    useEffect(() => {
        setIsBoxErrorVisible(false)
    }, [location])

    const handleDisplayingErrors = (): JSX.Element => {
        if (errors) {
            return <>
                {
                    typeof errors === "string" ? <p className="error-message"><MdErrorOutline /> {errors}</p> : (
                        <div className="errors-wrapper">
                            {errors.map((error) => (
                                <p key={Math.random()} className="error-message"><MdErrorOutline /> {error}</p>
                            ))}
                        </div>
                    )
                }
            </>
        }
        return <></>
    }

    useEffect(() => {
        if (errors) {
            setTimeout(() => {
                setIsBoxErrorVisible(true)
            }, 500)
        } else {
            setIsBoxErrorVisible(false)
        }
    }, [errors])

    return (
        <>
            <div className={`box-error-container ${isBoxErrorVisible ? "active" : ""}`}>
                <GrClose onClick={() => setIsBoxErrorVisible(false)} />
                {handleDisplayingErrors()}
            </div>
        </>
    )
}

export default ErrorBox

// #dc3545