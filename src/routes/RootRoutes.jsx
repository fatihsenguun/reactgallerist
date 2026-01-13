import React from 'react'
import Login from '../pages/Login'
import { Routes, Route } from 'react-router'
import Home from '../pages/Home'
import { useParams } from 'react-router'
import PrivateRoutes from './PrivateRoutes'
import Cars from '../pages/Cars'
import AddCars from '../pages/AddCars'
import Employee from '../pages/Employee'
import SellCar from '../pages/SellCar'
import DescriptionGenerator from '../pages/DescriptionGenerator'
import SmartCarFinder from '../pages/SmartCarFinder'

function RootRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<PrivateRoutes />}>
                <Route path='/' element={<Home />} />
                <Route path='/cars' element={<Cars />} />
                <Route path='/cars/add' element={<AddCars />} />
                <Route path='/cars/sell/:carId' element={<SellCar />} />
                <Route path='/carfinder' element={<SmartCarFinder />} />
                <Route path='/description' element={<DescriptionGenerator />} />
                <Route path='/employee' element={<Employee />} />


            </Route>

        </Routes>
    )
}

export default RootRoutes