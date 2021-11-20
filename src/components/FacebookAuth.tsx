import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";
import { FiFacebook } from "react-icons/fi"
import { useDispatch } from "react-redux";
import { facebookLogin } from "../redux/actions/authActions";

export type FacebookTitle = "Sign in with Facebook" | "Sign up with Facebook";

interface IProps {
    title: FacebookTitle
}

const FacebookAuth = ({ title }: IProps) => {

    const dispatch = useDispatch()

    const onFailure = (response: ReactFacebookFailureResponse) => {
        console.log(response)
    }

    const callback = (response: ReactFacebookLoginInfo) => {
        const { userID, accessToken } = response
        dispatch(facebookLogin(userID, accessToken))
    }

    return (
        <FacebookLogin
            appId="486001725859403"
            onFailure={onFailure}
            callback={callback}
            render={(renderProps: any) => (
                <>
                    <div
                        onClick={renderProps.onClick} 
                        style={{ 
                            display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid gray", padding: "6px 12px", gap: "10px", fontSize: "18px", background: "#3B5998", color: "rgb(255, 255, 255)", cursor: "pointer", 
                            pointerEvents: renderProps.isSdkLoaded ? "all" : "none",  opacity: renderProps.isSdkLoaded ? 1 : 0.5, minWidth: 240 
                        }}
                    >
                        <FiFacebook />
                        {title}
                    </div>
                </>
            )}

        />
    )
}

export default FacebookAuth
