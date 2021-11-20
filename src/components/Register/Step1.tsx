import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerStep1 } from '../../redux/actions/authActions'
import { RootState } from '../../redux/store'
import Input from '../Input'
import RegisterProgress from '../RegisterProgress'
import Buttons from './Buttons'

const initState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const Step1 = () => {
    const dispatch = useDispatch()
    const { step } = useSelector((state: RootState) => state.auth);
    const [registerState, setRegisterState] = useState(initState)

    const onFillingFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterState((prevState) => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const submitStep1 = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(registerStep1(registerState))
    }

    return (
        <form onSubmit={submitStep1} className="auth-form">
            <h2 className="auth-page-title">Fill your informations</h2>
            <div className="inputs-container">
                <Input name="firstName" type="text" placeholder="First name" onChange={onFillingFields} />
                <Input name="lastName" type="text" placeholder="Last name" onChange={onFillingFields} />
                <Input name="username" type="text" placeholder="Username" onChange={onFillingFields} />
                <Input name="email" type="text" placeholder="Email" onChange={onFillingFields} />
                <Input name="password" type="password" placeholder="Password" isPassword onChange={onFillingFields} />
                <Input name="confirmPassword" type="password" placeholder="Confirm password" isPassword onChange={onFillingFields} />
            </div>
            <Buttons />
            <Link className="to-auth-link" to="/login">Already have account ? Sign in</Link>
        </form>
    )
}

export default Step1
