import React, { useState } from 'react'
import "../css/register.css"
import axios from 'axios';

function Register() {

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

      if (response.data.data) {
        console.log(response.data.data);
        navigate('/login');
        setIsLoading(false)
      }

    } catch (error) {
      setIsLoading(false)
      alert("Error !")
      console.log(error);


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