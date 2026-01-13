import React from 'react'
import { Route, Routes } from 'react-router'
import Cars from '../pages/Cars'
import Home from '../pages/Home'
import AddCars from '../pages/AddCars'
import SellCar from '../pages/SellCar'
import SmartCarFinder from '../pages/SmartCarFinder'
import DescriptionGenerator from '../pages/DescriptionGenerator'

function MainRoutes() {


    return (
        <Routes>
            <Route path='/cars' element={<Cars />} />
            <Route path='/cars/add' element={<AddCars />} />
            <Route path='/cars/sell/:carId' element={<SellCar />} />
            <Route path='/carfinder' element={<SmartCarFinder />} />
            <Route path='/description' element={<DescriptionGenerator />} />
            <Route path='/employee' element={<Employee />} />
            <Route path='/' element={<Home />} />
        </Routes>
    )
}

export default MainRoutes