import "./Input.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useState } from "react";

interface IProps {
    name: string;
    type: string;
    placeholder: string;
    isPassword?: boolean;
    onChange: (param: any) => any;
}

const Input = ({ placeholder, name, type, isPassword, onChange }: IProps) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    
    return (
        <>
            <div className="input-field">
                <input placeholder={placeholder} type={isPasswordVisible ? "text" : type} name={name} onChange={onChange} />
                {
                    isPassword && (
                        <button onClick={() => setIsPasswordVisible(prev => !prev)} className="toggle-password-type" type="button">
                            {isPasswordVisible ? (
                                <AiFillEyeInvisible />
                            ) : (
                                <AiFillEye />
                            )}
                        </button>
                    )
                }
            </div>
        </>
    )
}

export default Input
