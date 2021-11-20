import { useEffect, useRef, useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import { useDispatch } from 'react-redux';
import { googleLogin } from '../redux/actions/authActions';

export type GoogleTitle = "Sign in with Google" | "Sign up with Google"

interface IProps {
    title: GoogleTitle
}

const GoogleAuth = ({title}: IProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    const buttonRef = useRef<HTMLDivElement>(null)
    const onSuccess = (response: any) => {
        const idToken : string | null = response?.Zb?.id_token
        if (idToken) {
            dispatch(googleLogin(idToken))
        }
    }

    const onFailure = (response: any) => {
        console.log(response)
    }

    useEffect(() => {
        // GoogleAuth.singIn()
        if ((window as any).gapi) {
            (window as any).gapi.load('auth2', function(){
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                let auth2 = (window as any).gapi.auth2.init({
                    client_id: '149142268632-kgtajcn8m4sj7u568gmq2q19na4q69ju.apps.googleusercontent.com',
                    // cookiepolicy: 'single_host_origin',
                })
                auth2.then(() => {
                    setIsLoaded(true)
                })
                auth2.attachClickHandler(buttonRef.current, {},
                    function(googleUser: any) {
                        onSuccess(googleUser)
                    }, function(error: any) {
                        onFailure(error)
                    });
                })
        }
    }, [])
    return (
        <>
            <div>
                <div style={{
                    display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid gray", padding: "6px 12px", gap: "10px", fontSize: "18px", background: "#4285F4", color: "#fff", cursor: "pointer",
                    pointerEvents: isLoaded ? "auto" : "none", minWidth: 240,
                    opacity: isLoaded ? "1" : ".5"
                }} ref={buttonRef} id="my-signin2">
                    <FcGoogle />
                    {title}
                </div>
            </div>
        </>
    )
}

export default GoogleAuth
