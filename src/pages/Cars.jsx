import "../css/cars.css"
import CarsBox from '../components/CarsBox';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import api from '../config/axios';
import { useNavigate } from 'react-router';
import PageStruct from '../components/PageStruct';

function Cars() {

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [isLoading, setIsLoading] = useState(false);
  const [carList, setCarList] = useState([]);


  useEffect(() => {
    handleSubmit();
  }, []);


  const handleSubmit = async () => {

    const payload = {
      headers: {
        Authorization: "Bearer " + token
      }

    };


    try {
      setIsLoading(true)
      const response = await api.get('/rest/api/galleristcar/cars');
      setIsLoading(false)
      console.log(response);
      if (response != null) {
        setCarList(response.data.data);
      }


    } catch (error) {
      setIsLoading(false)
      alert("Cars couldnt loaded !")
      console.log(error);


    }
  }





  return (
    <PageStruct>
      <div className='generalDiv'>
        <div className='addCarDiv'>
          <Button onClick={() => navigate("/cars/add")} className='addButton' variant="primary">+ Add Car</Button>
        </div>



        <div >
          {
            carList.map((car) => (
              <CarsBox key={car.id} data={car} />
            ))
          }
          {carList.length === 0 && !isLoading && <p>No vehicles to list.</p>}

        </div>
      </div>
    </PageStruct>
  )
}

export default Cars