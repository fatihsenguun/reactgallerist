import React, { useEffect, useState } from 'react'
import "../css/employee.css"
import PageStruct from '../components/PageStruct'
import EmployeeBox from '../components/EmployeeBox'
import WelcomeSection from '../components/WelcomeSection'
import api from '../config/axios';
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router'

function Employee() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);



  const getEmployees = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/rest/api/get/employee');
      setIsLoading(false)


      if (response.data.data) {
        setEmployeeList(response.data.data);
        console.log(employeeList);
      }

    } catch (error) {
      setIsLoading(false)
    }
  }


  return (
    <PageStruct>
      <div className='employeeHeader'>
        <WelcomeSection title={"Employees"} desc={"Manage Gallery Staff"} />
      </div>
      <div className='empAdd'>
        <Button onClick={() => navigate("/employee/add")} className='addButton' variant="primary">
          + Add Employee
        </Button>
      </div>

      {employeeList.map((employee) => (
        <EmployeeBox key={employee.id} data={employee} />

      ))}


    </PageStruct>
  )
}

export default Employee