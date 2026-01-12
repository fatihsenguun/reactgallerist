import React, { useEffect, useState } from 'react'
import "../css/compCarBox.css"
import axios from 'axios'


function CarsBox(data) {

console.log();

    return (
        <div className='car-card'>
            <div className='car-image-div'>
            </div>
            <div className='car-info'>
                <div>
                    <h3 className='car-title'> {data.data.brand} {data.data.model}</h3>
                    <div className='car-tags'>
                        <span className='tag'>Year: {data.data.productionYear}</span>
                     
                        <span className='tag'>KM: {data.data.km}</span>
                        <span className='tag'>Color: {data.data.color}</span>
                        <span className='tag'>Damage Price: {data.data.damagePrice}</span>
                    </div>
                </div>
                <div className='car-footer'>
                    <div className='price'>{data.data.price} TL</div>
                </div>
            </div>
        </div>
    )
}

export default CarsBox;