import React, { useState } from 'react';
import axios from 'axios'
import "../css/login.css";
import { useNavigate } from 'react-router';
import api from '../config/axios';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {

        const payload = {

            username: username,
            password: password,

        };

        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:8080/authenticate', payload);

            if (response.data.data.accessToken) {

                console.log(response);
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem("refreshToken", response.data.data.refreshToken);
                localStorage.setItem("role",response.data.data.role);




                navigate('/');
                setIsLoading(false)
            }

        } catch (error) {
            setIsLoading(false)
            alert("Invalid Username and Password !")
            console.log(error);


        }
    }









    return (
        <div className='login-container'>
            <div className='login-box'>


                <div className='info-div'>
                    <h2>Login</h2>
                    <p>Enter your information to access your account.</p>
                </div>


                <div className='form-div'>

                    <input
                        className='custom-input'
                        placeholder='Username'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className='custom-input'
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />



                    <button className='send-button' onClick={handleSubmit}>
                        {isLoading ? "LOADING..." : "LOGIN"}
                    </button>

                </div>
            </div>
            <div className='footer'>
                <p>Want to manage your gallery ? </p>

               <a style={{textDecoration:"none"}} href="/register"> <p style={{marginLeft:"5px"}}>Sign up now.</p></a>
            </div>
        </div>

    )
}

export default Login;