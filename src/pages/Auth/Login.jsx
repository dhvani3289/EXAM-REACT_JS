import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userLogin } from '../../Redux/Actions/LoginActions';
import './signUp.css';
function LogIn() {

    let [logIn, setLogIn] = useState({});
    let [validationErrors, setValidationErrors] = useState({});

    let handleChange = (e) => {
        let { name, value } = e.target
        setLogIn({ ...logIn, [name]: value })
    }
    console.log(logIn);

    let validation = () => {
        let validationMessages = {};
        if (!logIn.username) {
            validationMessages.username = 'Username is required';
        }
        if (!logIn.email) {
            validationMessages.email = 'Email is required';
        }
        else if (!logIn.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            validationMessages.email = 'You have entered an invalid email address!'
        }
        if (!logIn.password) {
            validationMessages.password = 'Password is required';
        }
        else if (!logIn.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)) {
            validationMessages.password = 'Enter a password between 7 to 15 characters which contain at least one numeric digit and a special character.'
        }
        return validationMessages;
    }

    let submitData = async (e) => {
        e.preventDefault();
        let formErrors = validation();
        if (Object.keys(formErrors).length > 0) {
            setValidationErrors(formErrors)
        }
        else {
            let userData = await axios.get("http://localhost:3000/registeredUsers?email=" + logIn.email);
            if (userData.data.length == 1) {
                if (userData.data[0].password === logIn.password) {
                    await axios.post("http://localhost:3000/registeredUsers", logIn);
                    window.location = "/";
                }
                else {
                    toast.error("wrong password")
                }
            }
            else {
                toast.error("Email already exists");
            }
        }
    }

    return (
        <>
            <div className='signup-wrap'>
                <form method="post" onSubmit={(e) => submitData(e)}>
                    <div className="box">
                        <h2 className='signUp'>LOG IN</h2>

                        <input type="email" placeholder='Enter Your Email' name='email' onChange={(e) => handleChange(e)} />
                        <div className='error'> {validationErrors.email && <p>{validationErrors.email}</p>}</div>

                        <input type="password" placeholder='Create Password' name='password' onChange={(e) => handleChange(e)} />
                        <div className='error'> {validationErrors.password && <p>{validationErrors.password}</p>}</div>

                        <button type="submit" className='register-btn'>LOG IN</button>
                        <p>
                            Don't have an account?
                            <Link to="/signUp">Sign Up</Link>
                        </p>

                    </div>
                </form >
            </div >
            <ToastContainer />
        </>
    )
}

export default LogIn;