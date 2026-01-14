import React, { useEffect, useState } from 'react'
import "../css/compCarBox.css"
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

function CarsBox(data) {
    const navigate = useNavigate();

    return (
        <div className='car-card'>
            <div className='car-info'>
                <div className='car-header'>
                    <h3 className='car-title'>{data.data.brand} {data.data.model}</h3>

                    <div className='car-tags'>
                        <span className='tag'>Year: {data.data.productionYear}</span>
                        <span className='tag'>KM: {data.data.km}</span>
                        <span className='tag'>Color: {data.data.color}</span>
                        <span className='tag'>Plate: {data.data.plate}</span>
                        {data.data.damagePrice > 0 ? (
                            <span className='tag damage'>Damage: {data.data.damagePrice} TL</span>
                        ) : (
                            <span className='tag clean'>No Damage</span>
                        )}
                    </div>
                </div>

                <div className='car-footer'>
                    <div className='price'>{data.data.price} {data.data.currencyType || "TL"}</div>

                    {data.data.carSaled === false ? (
                        <Button
                            onClick={() => navigate("/cars/sell/" + data.data.id)}
                            size='sm'
                            className='sell-btn'
                            variant="danger"
                        >
                            Sell Car
                        </Button>
                    ) : (
                        <span style={{ color: '#dc3545', fontWeight: 'bold', border: '1px solid #dc3545', padding: '5px 15px', borderRadius: '5px' }}>
                            SOLD
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CarsBox;