import React from 'react'
import { Navigate, Outlet } from 'react-router';

import Header1 from '../components/Header1';
const role = localStorage.getItem("role");
const token = localStorage.getItem("accessToken");

function AdminRoutes() {

  if (token) {
    if (role == "ADMIN") {
      return (<div>
        <Header1 /> <Outlet />
      </div>)
    }
  }

  return (
    <Navigate to="/login" />
  )
}

export default AdminRoutes