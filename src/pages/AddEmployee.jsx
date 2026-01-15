import React, { use, useState } from 'react'
import "../css/addEmployee.css"
import PageStruct from '../components/PageStruct';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import axios from 'axios';
import api from '../config/axios';

function AddEmployee() {
      const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, SetRole] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const [showSuccess, setShowSuccess]=useState(false);


     if(showSuccess){
      
          Swal.fire({
                      title: 'Employee Added!',
                      text: 'Employee has been successfully added to your gallery.',
                      icon: 'success',
                      confirmButtonText: 'Go to Employees',
                      confirmButtonColor: '#28a745'
                    }).then((result) => {
            
                      if (result.isConfirmed) {
                        navigate("/employee");
                      }
                    });
      }



    const handleSubmit = async () => {

        const payload = {
            username: username,
            password: password,
            role: role,
           
        };

        try {
            setIsLoading(true);
            const response = await api.post('register/emp', payload);

            if (response.data.result === true) {

                console.log(response.data.data);
                setIsLoading(false);
                setShowSuccess(true);
                
            }

        } catch (error) {
            setIsLoading(false);
            alert("Car cannot be saved");
            console.log(error);
        }
    }



    return (
        <PageStruct>
            <div className='empDiv'>
                <div className="info-div">
                    <h2>Add New Employee</h2>
                    <p>Enter the details of the employee to be added to the system.</p>
                </div>

                <div className="form-div">

                    <input
                        className='custom-input'
                        placeholder='Username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className='custom-input'
                        placeholder='Password'
                        type='text'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className='custom-input'
                        placeholder='Role (ADMIN-EMPLOYEE)'
                        type='text'
                        value={role}
                        onChange={(e) => SetRole(e.target.value)}
                    />


                    <button onClick={handleSubmit} className="send-button" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Add Employee"}
                    </button>

                </div></div>
        </PageStruct>
    )
}

export default AddEmployee