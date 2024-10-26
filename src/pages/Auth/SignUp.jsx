import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signUp.css'
function SignUp() {

    let [signUp, setSignUp] = useState({});

    let handleChange = (e) => {
        let { name, value } = e.target
        setSignUp({ ...signUp, [name]: value })
    }
    console.log(signUp);

    let submitData = async (e) => {
        e.preventDefault();

        let userData = await axios.get("http://localhost:3000/registeredUsers?email=" + signUp.email);
        if (userData.data.length == 0) {
            if (signUp.password === signUp.confirmPassword) {
                await axios.post("http://localhost:3000/registeredUsers", signUp);
                window.location = "/";
            }
        }
        else {
            toast.error("Email already exists");
        }

    }


 
    return (
        <>
            <div className='signup-wrap'>
                <form method="post" onSubmit={(e) => submitData(e)}>
                    <div className="box">
                        <h2 className='signUp'>SIGN UP</h2>
                        <input type="text" placeholder='Enter Your Name' name='username' onChange={(e) => handleChange(e)} />

                        <input type="email" placeholder='Enter Your Email' name='email' onChange={(e) => handleChange(e)} />

                        <input type="password" placeholder='Create Password' name='password' onChange={(e) => handleChange(e)} />

                        <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)} />

                        <button type="submit" className='register-btn'>SIGN UP</button>
                        <p>
                            Already have an account?
                            <Link to="/logIn">Login Now</Link>
                        </p>

                    </div>
                </form >
            </div >
            <ToastContainer />
        </>
    )
}

export default SignUp;