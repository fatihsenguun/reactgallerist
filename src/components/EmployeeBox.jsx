import React, { useState } from 'react'
import "../css/compEmployeeBox.css"

function EmployeeBox(data) {

    const [isAdmin, setIsAdmin] = useState(false);
   

        return (


            <div className='employeeBox'>
                <div className='employeeName'>
                    <h2>{data.data.id}-</h2>

                    <h2>{data.data.username}</h2>
                </div>
                {data.data.role == "ADMIN" ? (
                    <span className='tag admin'>ADMIN</span>
                ) : (
                    <span className='tag clean'>EMPLOYEE</span>
                )}
            </div>
        )
}

export default EmployeeBox