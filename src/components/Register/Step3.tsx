import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerStep3 } from '../../redux/actions/authActions';
import Input from '../Input';
import Buttons from './Buttons';
import "./Step3.css";

const Step3 = () => {
    const dispatch = useDispatch()
    const [location, setLocation] = useState({
        country: "",
        city: ""
    })
    const [gender, setGender] = useState<"male" | "female" | "prefer not to say" | "Choose your gender">("Choose your gender")

    const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "male" || e.target.value === "female" || e.target.value === "prefer not to say") {
            setGender(e.target.value)
        }
    }

    const submitStep3 = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (gender.length > 0 && gender !== "Choose your gender") {
            dispatch(registerStep3({
                country: location.country,
                city: location.city,
                gender
            }))
        }
    }

    return (
        <form onSubmit={submitStep3} className="auth-form">
            <h2 className="auth-page-title">Choose your country, city, and your gender (only gender is required)</h2>
            <div className="step3-wrapper">
                <Input name="country" placeholder="Your country" type="text" onChange={handleLocation} />
                <Input name="city" placeholder="Your city" type="text" onChange={handleLocation} />
                <select className="select gender-select" value={gender} name="gender" onChange={handleGender}>
                    <option disabled value="Choose your gender">Choose your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer not to say">Prefer not to say</option>
                </select>
            </div>
            <Buttons isNextDisabled={gender.length <= 0} />
        </form>
    )
}

export default Step3
