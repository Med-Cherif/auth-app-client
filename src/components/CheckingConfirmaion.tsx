import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Navbar from './Navbar'
import "./CheckingConfirmaion.css";
import { resendLinkAction } from '../redux/actions/authActions';

let count: any;
function counterValue () {
    return 300
}

const CheckingConfirmaion = () => {

    const { userData } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [isResendLinkReady, setIsResendLinkReady] = useState(false);
    const [value, setValue] = useState(() => counterValue());

    const counter = () => {
        let minutes: string | number = Math.floor(value / 60)
        let seconds: string | number = Math.floor(value - minutes * 60)

        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        if (seconds < 10) {
            seconds = `0${seconds}`
        }

        return `${minutes}:${seconds}`
    }

    const callback = () => {
        setIsResendLinkReady(false)
        setValue(() => counterValue())
        clearInterval(count)
        handleCount()
    }

    const resendLink = () => {
        dispatch(resendLinkAction(callback))
    }

    const handleCount = () => {
        count = setInterval(() => {
            setValue(prev => prev - 1)
        }, 1000)
    }


    useEffect(() => {
        handleCount()
    }, [])

    useEffect(() => {
        if (value === 0) {
            setIsResendLinkReady(true)
            clearInterval(count)
        }
    }, [value])
    
    
   
   const buttonStyles = useMemo((): CSSProperties => {
        return {
            cursor: isResendLinkReady ? 'pointer' : 'not-allowed',
            opacity: isResendLinkReady ? 1 : .5
        }
   }, [isResendLinkReady])

    return (
        <div style={{ minHeight: "100vh", height: "1px" }}>
            <Navbar />
            {value}
            <div className="checking-confirmation-container">
                <div className="checking-confirmation-box">
                    <p>You have to verify your email <span>({userData?.email})</span> in your mail account</p>
                    <div className="resend-link-confirmation"> 
                        You will able to <button style={buttonStyles} onClick={resendLink}>Resend a Link</button> after {counter()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckingConfirmaion
