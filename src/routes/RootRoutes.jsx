import React from 'react'
import Login from '../pages/Login'
import { Routes, Route } from 'react-router'
import Home from '../pages/Home'
import PrivateRoute from './PrivateRoutes'
import MainRoutes from './MainRoutes'
import PrivateRoutes from './PrivateRoutes'
import Cars from '../pages/Cars'

function RootRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<PrivateRoutes />}>
                <Route path='/' element={<Home />} />
                <Route path='cars' element={<Cars />} />

            </Route>

        </Routes>
    )
}

export default RootRoutes