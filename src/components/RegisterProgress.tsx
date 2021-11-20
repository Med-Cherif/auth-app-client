import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const RegisterProgress = () => {
    const { allSteps, step } = useSelector((state: RootState) => state.auth)
    return (
        <div style={{
            width: "100%",
            height: "12px",
            border: "2px solid #EC7063",
            marginBottom: 10,
            borderRadius: 30,
            position: "relative",
            maxWidth: 900,
        }}>
            <span 
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: 30,
                    width: `${step * 100 / allSteps}%`,
                    height: "100%",
                    transition: "all .5s ease",
                    background: "#EC7063",
                }}
            >

            </span>
        </div>
    )
}

export default RegisterProgress
