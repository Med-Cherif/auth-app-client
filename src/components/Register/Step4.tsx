import Buttons from './Buttons'
import "./Step4.css";
import { BsPlusLg } from "react-icons/bs"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerStep4, choosingProfilePictureAction } from '../../redux/actions/authActions';
import { RootState } from '../../redux/store';

const Step4 = () => {

    const dispatch = useDispatch()
    const { authData } = useSelector((state: RootState) => state.auth)
    
    const imageUrl = (authData as any)?.profilePicturePath ? process.env.REACT_APP_API_URL + '/' + (authData as any)?.profilePicturePath : "/login.png"

    const submitStep4 = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(registerStep4())
    }

    const setProfilePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const formData = new FormData()
            formData.append('profile-picture', files[0])
            dispatch(choosingProfilePictureAction(formData))
        }
    }

    return (
        <form onSubmit={submitStep4} className="auth-form">
            <h2 className="auth-page-title">Choose your profile picture</h2>
            <div className="step4-wrapper">
                <div className="rounded-container">
                    <img 
                        className="rounded-image" 
                        src={imageUrl} alt="" 
                    />
                    <input style={{ display: "none" }} type="file" id="file-input" onChange={setProfilePicture} />
                    <label htmlFor="file-input">
                        <BsPlusLg className="add-profile-picture-icon" />
                    </label>
                </div>
            </div>
            <Buttons />
        </form>
    )
}

export default Step4
