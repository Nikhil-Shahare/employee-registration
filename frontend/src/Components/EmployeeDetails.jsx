// EmployeeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./EmployDetails.css"
const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
 const navigate = useNavigate();
  useEffect(() => {
    // Fetch employee details based on the ID from the URL parameter
    axios
      .get(`http://localhost:4000/DeliveryBoy/Get-Employee/${id}`) // Replace with your backend endpoint
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee details:', error);
      });
  }, [id]);

  const handleClick = ()=>{
    navigate("/employee")
  }

  return (
    <div className="employee-details">
      <h1>Employee Details</h1>
      <div className="employee-info">
        <h2>Name: {`${employee.firstName} ${employee.lastName}`}</h2>
        <p>Date of Birth (DOB): {employee.dob}</p>
        <p>Education: {employee.education}</p>
        <p>Start Date: {employee.startDate}</p>
        <p>End Date: {employee.endDate}</p>
        <p>Current Salary: {employee.currentSalary}</p>
        <p>Description:</p>
        <div dangerouslySetInnerHTML={{ __html: employee.description }} />
      </div>
      <button className='button' onClick={handleClick}>go back</button>
    </div>
  );
};

export default EmployeeDetails;
