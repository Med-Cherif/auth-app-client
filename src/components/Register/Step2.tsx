import { useEffect, useState } from 'react';
import Buttons from './Buttons';
import ReactCalendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./Step2.css";
import { useDispatch } from 'react-redux';
import { registerStep2 } from '../../redux/actions/authActions';

const Step2 = () => {

    const dispatch = useDispatch()
    const [value, onChange] = useState(new Date("2000"));
    const [birthday, setBirthday] = useState<`${number}/${number}/${number}`>("01/01/2000");

    const submitStep2 = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(registerStep2(birthday))
    }

    // month / day
    useEffect(() => {
        (
            function() {
                const day = value.getDate()
                const month = value.getMonth() + 1
                const year = value.getFullYear()
                setBirthday(`${month}/${day}/${year}`)
            }
        )()
    }, [value])

    return (
        <form onSubmit={submitStep2} className="auth-form">
            <h2 className="auth-page-title">Choose your birthday</h2>
            <div className="react-calendar-wrapper">
                <ReactCalendar 
                    value={value}
                    onChange={onChange}
                    maxDate={new Date()}
                />
            </div>
            <Buttons />
        </form>
    )
}

export default Step2
