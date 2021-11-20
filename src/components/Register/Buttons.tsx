import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { prevStep } from "../../redux/slices/auth";

interface IProps {
    isNextDisabled?: boolean,
}

const Buttons = ({ isNextDisabled }: IProps) => {
    const { isLoading, step, allSteps } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    const handleDisplayingButtons = (): JSX.Element => {
        return <>
            {
                step === 1 ? (
                    <button style={{marginLeft: "auto"}} className="auth-button next" type="submit">
                        {isLoading ? "Loading..." : "Next"}
                    </button>
                ) : step === allSteps ? (
                    <button style={{ margin: "auto" }} type="submit" className="auth-button signup">
                        {isLoading ? "Loading..." : "Sign up"}
                    </button>
                ) : <>
                    <button onClick={() => dispatch(prevStep())} className="auth-button prev" type="button">
                        Prev
                    </button>
                    <button disabled={isNextDisabled} className="auth-button next" type="submit">
                        {isLoading ? "Loading..." : "Next"}
                    </button>
                </>
            }
        </> 
    }
    return (
        <div className="next-prev-buttons">
            {handleDisplayingButtons()}
        </div>
    )
}

export default Buttons
