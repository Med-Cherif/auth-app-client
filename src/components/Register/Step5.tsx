import React from 'react'
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import Buttons from './Buttons'
import "./Step5.css";

const Step5 = () => {
    const dispatch = useDispatch()
    const signup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(register())
    }
    return (
        <form onSubmit={signup} className="auth-form">
            <h2 className="auth-page-title">Sign up</h2>
            <div className="step5-wrapper">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nobis inventore. Dolores quam qui in.</p>
            </div>
            <Buttons />
        </form>
    )
}

export default Step5
