// EmployeeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});

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

  return (
    <div className="employee-details">
      <h1>Employee Details</h1>
      <div className="employee-info">
        <h2>Name: {`${employee.first_name} ${employee.last_name}`}</h2>
        <p>Date of Birth (DOB): {employee.DOB}</p>
        <p>Education: {employee.study}</p>
        <p>Start Date: {employee.start_date}</p>
        <p>End Date: {employee.end_date}</p>
        <p>Current Salary: {employee.salary}</p>
        <p>Description:</p>
        <div dangerouslySetInnerHTML={{ __html: employee.description }} />
      </div>
    </div>
  );
};

export default EmployeeDetails;
