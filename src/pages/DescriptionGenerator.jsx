import React, { useState } from 'react'
import PageStruct from '../components/PageStruct'
import WelcomeSection from '../components/WelcomeSection'
import Button from 'react-bootstrap/esm/Button'
import ReactMarkdown from 'react-markdown';
import api from '../config/axios';


function DescriptionGenerator() {

  const [plate, setPlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");


  const handleFinalConfirm = async () => {


    try {
      setIsLoading(true)
      const response = await api.get(`/rest/api/openai/description/car/${plate.toUpperCase()}`);
      setIsLoading(false)
      if (response.data != null) {
        setResponse(response.data.data);
      }
      else {
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
        <WelcomeSection title="Description Generator" desc="Please enter the license plate number to get the vehicle details." />
        <div className='midDiv'>
          <div className='inputDiv'>
            <input disabled={isLoading}  onChange={(e) => setPlate(e.target.value)} placeholder='Enter License...' className='input' />
          </div>

          <Button disabled={isLoading} onClick={handleFinalConfirm} className='button'>{isLoading?"Loading...":"Generate"}</Button>

        </div>
        <div style={{marginTop:"50px"}} className='descDiv'>
        
          <ReactMarkdown>
            {response}
          </ReactMarkdown>
        </div>

      </div>
    </PageStruct>
  )
}

export default DescriptionGenerator