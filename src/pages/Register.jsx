import React, { useState } from 'react'
import "../css/register.css"

function Register() {

const [username, setUsername]=useState("");
const [password, setPassword]=useState("");
const [isLoading, setIsLoading]=useState(false);

const handleSubmit=()=>{
  
}

  return (
     <div className='register-container'>
            <div className='register-box'>


                <div className='info-div'>
                    <h2>Register</h2>
                    <p>Enter your information to create your account.</p>
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
                        {isLoading ? "LOADING..." : "SIGNUP"}
                    </button>

                </div>
            </div>
            <div className='footer'>
                <p>Already have an account ? </p>

               <a style={{textDecoration:"none"}} href="/login"> <p style={{marginLeft:"5px"}}>Log In.</p></a>
            </div>
        </div>
  )
}

export default Register