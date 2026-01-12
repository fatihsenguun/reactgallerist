import React from 'react'
import { useNavigate } from 'react-router';
import Header1 from '../components/Header1';



function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")

  }

  return (
    <div className='text-center'>
     
      <button onClick={handleLogout} >
        Çıkış yap
      </button>


    </div>
  )
}

export default Home