import React from 'react'
import { Route, Routes } from 'react-router'
import Cars from '../pages/Cars'
import Home from '../pages/Home'

function MainRoutes( ) {


    return (
        <Routes>
            <Route path='/cars' element={<Cars />} />
            <Route path='/' element={<Home />} />
        </Routes>
    )
}

export default MainRoutes