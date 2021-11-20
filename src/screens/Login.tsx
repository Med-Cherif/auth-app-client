import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import SocialAuth from "../components/SocialAuth";
import { login } from "../redux/actions/authActions";
import { RootState } from "../redux/store";

const initState = {
    username: "",
    password: ""
}

const Login = () => {

    const dispatch = useDispatch()
    const { isLoading } = useSelector((state: RootState) => state.auth)
    const [loginState, setLoginState] = useState(initState)

    const onFillingFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState((prevState) => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const signin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(login(loginState))
    }

    return (
        <div className="auth-page login">
            <form onSubmit={signin} className="auth-form">
                <h2 className="auth-page-title">Sign in</h2>
                <div className="inputs-container">
                    <Input name="username" type="text" placeholder="Username" onChange={onFillingFields} />
                    <Input name="password" type="password" placeholder="Password" isPassword onChange={onFillingFields} />
                </div>

                <button className="auth-button" type="submit">
                    {isLoading ? "Loading..." : "Sign in"}
                </button>
                <Link className="to-auth-link" to={{
                    pathname: "/register"
                }}>New here ? Sign up</Link>
                <p className="auth-text">Or sign in using:</p>
                <SocialAuth facebookTitle="Sign in with Facebook" googleTitle="Sign in with Google" />
            </form>
        </div>
    )
}

export default Login