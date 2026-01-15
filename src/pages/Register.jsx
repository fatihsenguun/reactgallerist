import React, { useState } from 'react'
import "../css/register.css"
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [galleristName, setGalleristName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {


    const payload = {
      username: username,
      password: password,
      role: "ADMIN",
      gallerist: {
        galleristName: galleristName,
        address: {
          city: city,
          district: district,
          neighborhood: neighborhood,
          street: street
        }
      }

    };

    try {
      setIsLoading(true)
      const response = await axios.post('http://localhost:8080/register', payload);

      if (response.status === 200) {
        Swal.fire({
          title: 'Welcome Aboard! 🎉',
          text: 'Your account has been created successfully. You can now log in.',
          icon: 'success',
          confirmButtonText: 'Go to Login',
          confirmButtonColor: '#28a745'
        }).then((result) => {

          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }

    } catch (error) {
      setIsLoading(false)
      Swal.fire({
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#d33'
      });


    }
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
          <input
            className='custom-input'
            placeholder='Gallerist Name'
            type="text"
            value={galleristName}
            onChange={(e) => setGalleristName(e.target.value)}
          />
          <input
            className='custom-input'
            placeholder='City'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className='custom-input'
            placeholder='District'
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <input
            className='custom-input'
            placeholder='Neighborhood'
            type="text"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
          <input
            className='custom-input'
            placeholder='Street'
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />





          <button className='send-button' onClick={handleSubmit}>
            {isLoading ? "LOADING..." : "SIGNUP"}
          </button>

        </div>
      </div>
      <div className='footer'>
        <p>Already have an account ? </p>

        <a style={{ textDecoration: "none" }} href="/login"> <p style={{ marginLeft: "5px" }}>Log In.</p></a>
      </div>
    </div>
  )
}

export default Register