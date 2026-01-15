import React, { useState } from 'react';
import "../css/addCars.css";
import PageStruct from '../components/PageStruct';
import api from '../config/axios';
import { useNavigate } from 'react-router'; 
import Alert from 'react-bootstrap/Alert'; 
import Button from 'react-bootstrap/esm/Button';
import Swal from 'sweetalert2';

function AddCars() {

  const navigate = useNavigate(); 
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [km, setKm] = useState();
  const [year, setYear] = useState();
  const [price, setPrice] = useState();
  const [damagePrice, setDamagePrice] = useState();
  const [plate, setPlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const [showSuccess, setShowSuccess] = useState(false); 

  if(showSuccess){
      Swal.fire({
                  title: 'Car Added!',
                  text: 'Your vehicle has been successfully added to your gallery.',
                  icon: 'success',
                  confirmButtonText: 'Go to Inventory',
                  confirmButtonColor: '#28a745'
                }).then((result) => {
        
                  if (result.isConfirmed) {
                    navigate("/cars");
                  }
                });
  }
  const handleSubmit = async () => {

    const payload = {
      plate: plate,
      brand: brand,
      model: model,
      color: color,
      productionYear: year, 
      price: price,
      km: km,
      currencyType: "TL",
      damagePrice: damagePrice,
      carSaled: false,
    };

    try {
      setIsLoading(true);
      const response = await api.post('/rest/api/car/save', payload);

      if (response.data.result === true) {

        setIsLoading(false);

        setShowSuccess(true);
        
        
        setTimeout(() => {
            navigate('/cars');
        }, 1500);
      }

    } catch (error) {
      setIsLoading(false);
      alert("Car cannot be saved"); 
      console.log(error);
    }
  }

  return (
    <PageStruct>

<Button className="btn-danger" onClick={() => navigate(-1)}> Back </Button>
    

      <div className="info-div">
        <h2>Add New Vehicle</h2>
        <p>Enter the details of the vehicle to be added to the gallery.</p>
      </div>

      <div className="form-div">

        <input
          className='custom-input'
          placeholder='Brand (e.g.: BMW)'
          type='text'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          className='custom-input'
          placeholder='Model (e.g.: 5.20i)'
          type='text'
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          className='custom-input'
          placeholder='Color (e.g.: Black)'
          type='text'
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <input
          className='custom-input'
          placeholder='KM (100000)'
          type='number'
          value={km}
          onChange={(e) => setKm(e.target.value)}
        />

        <input
          className='custom-input'
          placeholder='Year (e.g.: 2023)'
          type='number'
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          className='custom-input'
          placeholder='Price (TL)'
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className='custom-input'
          placeholder='Damage Price (TL)'
          type='text'
          value={damagePrice}
          onChange={(e) => setDamagePrice(e.target.value)}
        />
        <input
          className='custom-input'
          placeholder='Plate (e.g.:34ABC123)'
          type='text'
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />

        <button onClick={handleSubmit} className="send-button" disabled={isLoading || showSuccess}>
          {isLoading ? "Loading..." : "Add Car"}
        </button>

      </div>

    </PageStruct>
  )
}

export default AddCars;