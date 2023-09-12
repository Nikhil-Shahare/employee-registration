import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DropdownMenu from './DropdownMenu';
import { useNavigate } from 'react-router-dom';
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate =useNavigate()
  useEffect(() => {
    // Fetch the list of registered employees from your backend
    axios
      .get('http://localhost:4000/DeliveryBoy/Get-Employee') // Replace with your backend endpoint
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleView = (employee) => {
    // Navigate to the EmployeeDetails page with the employee's ID as a parameter
    navigate(`/employee/${employee._id}`);
  };
  
  const handleUpdate = (employee) => {
    // Navigate to the EmployeeDetails page with the employee's ID as a parameter
    navigate(`/updateemployee/${employee._id}`);
  };
  // Function to format a date string as MM/DD/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div>
      <h1>Employee List</h1>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{`${employee.first_name} ${employee.last_name}`}</td>
              <td>{formatDate(employee.DOB)}</td>
              <td>{formatDate(employee.start_date)}</td>
              <td>{formatDate(employee.end_date)}</td>
              <td>{employee.description}</td>
              <td>
                <DropdownMenu
                  onView={() => handleView(employee)}
                  onUpdate={() => handleUpdate(employee)}
                  onDelete={() => handleDelete(employee)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
