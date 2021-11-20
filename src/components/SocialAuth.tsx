import "./SocialAuth.css";
import FacebookAuth, { FacebookTitle } from "./FacebookAuth";
import GoogleAuth, { GoogleTitle } from "./GoogleAuth";


interface IProps {
    googleTitle: GoogleTitle;
    facebookTitle: FacebookTitle;
}


const SocialAuth = ({ googleTitle, facebookTitle }: IProps) => {
    return (
        <div className="social-auth">
            <GoogleAuth title={googleTitle} />
            <FacebookAuth title={facebookTitle} />
        </div>
    )
}

export default SocialAuth
