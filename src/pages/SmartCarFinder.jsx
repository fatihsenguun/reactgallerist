import React, { useState } from 'react'
import PageStruct from "../components/PageStruct"
import "../css/smartCarFinder.css"
import { useNavigate } from 'react-router'
import WelcomeSection from '../components/WelcomeSection';
import Button from 'react-bootstrap/esm/Button';
import CarsBox from '../components/CarsBox';
import api from '../config/axios';

function SmartCarFinder() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("")
  const [aiResponse, setAiResponse] = useState([]);


  const findCarApi = async () => {
    const payload = {
      prompt
    }
    try {
      setIsLoading(true)
      const response = await api.post(`/rest/api/vector/search`, payload);
      setIsLoading(false)
      if (response.data) {
        setAiResponse(response.data.data);
        console.log(aiResponse);

      }

      if (response == null) {
        console.log("cannot find");
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }

  }



  const handleFinalConfirm = async () => {


    try {
      setIsLoading(true)
      const response = await api.get(`/rest/api/vector`);
      setIsLoading(false)
      if (response.data != 0) {
        findCarApi();
      }
      if (response == null) {
        console.log("cannot find");
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }

  }












  return (
    <PageStruct>
      <div className='smartCarDiv'>
        <WelcomeSection title="Smart Car Finder" desc="Simply describe what you're looking for, and let AI find the perfect match." />
        <div className='midDiv'>
          <div className='inputDiv'>
            <textarea onChange={(e) => setPrompt(e.target.value)} placeholder='Enter Text...' className='input' />
          </div>
          <Button onClick={handleFinalConfirm} className='button'>Find</Button>

        </div>
        <div className='findedCars'>
          <h3>{aiResponse==0? "":"Top 3 Matching Cars :"}</h3>
          {aiResponse.map((car)=>(
             <CarsBox key={car.id} data={car}/>
          ))}


        </div>
      </div>
    </PageStruct>
  )
}

export default SmartCarFinder