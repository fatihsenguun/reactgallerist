import "../css/cars.css"
import CarsBox from '../components/CarsBox';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import api from '../config/axios';
import { useNavigate } from 'react-router';
import PageStruct from '../components/PageStruct';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import WelcomeSection from "../components/WelcomeSection";

function Cars() {

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [isLoading, setIsLoading] = useState(false);
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {

    try {
      setIsLoading(true)
      const response = await api.get('/rest/api/galleristcar/cars');
      setIsLoading(false)
    
      if (response != null) {
        setCarList(response.data.data);
      }

    } catch (error) {
      setIsLoading(false)
      alert("Cars could not be loaded!")
      console.log(error);
    }
  }

const availableCars = carList.filter(car=>car.carSaled==false)
const saledCars = carList.filter(car=>car.carSaled==true);

  return (
   <PageStruct>
 
    <div >
      <div style={{padding:"20px 0"}}>  <WelcomeSection title={"Inventory"} desc={"You can manage your cars."}/></div>
      
      <div className='addCarDiv' >
      
        <Button onClick={() => navigate("/cars/add")} className='addButton' variant="primary">
          + Add Car
        </Button>
      </div>

     <Tabs defaultActiveKey="gallery" id="car-tabs" className="mb-3" fill>
      
      <Tab eventKey="gallery" title={`Vehicles in the Gallery (${availableCars.length})`}>
        <div className="cars-list-container">
          {availableCars.map((car)=>(
            <CarsBox key={car.id} data={car}/>
          ))}
          
          {availableCars.length === 0 && !isLoading &&(
            <div className="empty-message">Current gallery is empty.</div>
          )}
        </div>
      </Tab>
      
       <Tab eventKey="sold" title={`Sold Cars (${saledCars.length})`}>
        <div className="cars-list-container">
          {saledCars.map((car)=>(
            <CarsBox key={car.id} data={car}/>
          ))}
          
          {saledCars.length === 0 && !isLoading &&(
            <div className="empty-message">No sales history found.</div>
          )}
        </div>
      </Tab>

     </Tabs>
     
     {isLoading && <p className="text-center mt-3">Loading...</p>}
    </div>
  </PageStruct>
  )
}

export default Cars