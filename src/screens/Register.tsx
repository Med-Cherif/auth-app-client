import "./styles/Register.css";
import { useDispatch, useSelector } from "react-redux";
import RegisterProgress from "../components/RegisterProgress";
import { RootState } from "../redux/store";
import Step1 from "../components/Register/Step1";
import Step2 from "../components/Register/Step2";
import Step3 from "../components/Register/Step3";
import Step4 from "../components/Register/Step4";
import Step5 from "../components/Register/Step5";

const stepsComponents = [
    <Step1 />, <Step2 />, <Step3 />, <Step4 />, <Step5 />
]

const Register = () => {
    const { step } = useSelector((state: RootState) => state.auth)
    return (
        <div className="auth-page register">
            <RegisterProgress />
            {stepsComponents[step - 1]}
        </div>
        
    )
}

export default Register
