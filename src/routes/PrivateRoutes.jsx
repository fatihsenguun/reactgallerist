import React from 'react'
import { Navigate, Outlet } from 'react-router';

import Header1 from '../components/Header1';

const PrivateRoutes = () => {

  const token = localStorage.getItem("accessToken");

  if (token) {
    return (<div>
      <Header1 /> <Outlet />
    </div>)
  }

  return (
    <Navigate to="/login" />
  )
}

export default PrivateRoutes