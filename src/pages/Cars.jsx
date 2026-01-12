
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../css/cars.css"
import CarsBox from '../components/CarsBox';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';

function Cars() {

  const token = localStorage.getItem("token");

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
      const response = await axios.get(`http://localhost:8080/rest/api/galleristcar/cars`, payload)
      setIsLoading(false)
      console.log(response);
      if (response != null) {
        setCarList(response.data);
      }


    } catch (error) {
      setIsLoading(false)
      alert("Cars couldnt loaded !")
      console.log(error);


    }
  }





  return (
    <div className='cars'>
      <Container>
        <Row className='row'>
          <Col lg={2}>

          </Col>
          <Col lg={8}>
            <div className='addCarDiv'>
               <Button className='addButton' variant="primary">+ Add Car</Button>
            </div>



            <div className='generalDiv'>
              {
                carList.map((car) => (
                  <CarsBox key={car.id} data={car} />
                ))
              }
              {carList.length === 0 && !isLoading && <p>No vehicles to list.</p>}

            </div>
          </Col>
          <Col lg={2}>

          </Col>
        </Row>
      </Container>


    </div>
  )
}

export default Cars