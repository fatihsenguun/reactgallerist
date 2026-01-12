import React, { useState } from 'react';
import axios from 'axios'
import "../css/login.css";
import { useNavigate } from 'react-router';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {

        const payload = {

            username: username,
            password: password


        };


        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:8080/authenticate', payload)
            setIsLoading(false)
            console.log("Login Success");

            if (response.data) {
                localStorage.setItem("token", response.data.data.accessToken);
                navigate("/");

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
        </div>
    )
}

export default Login;