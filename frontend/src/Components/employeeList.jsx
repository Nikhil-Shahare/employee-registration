import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DropdownMenu from './DropdownMenu';
import { useNavigate } from 'react-router-dom';
import "./employeeList.css"


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const navigate = useNavigate();

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

  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (employeeToDelete) {
      axios
        .delete(`http://localhost:4000/DeliveryBoy/delete-employee/${employeeToDelete._id}`)
        .then(() => {
          // Reload the employee list after deleting
          axios
            .get('http://localhost:4000/DeliveryBoy/Get-Employee')
            .then((response) => {
              setEmployees(response.data);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
        })
        .finally(() => {
          // Close the delete modal
          setShowDeleteModal(false);
          setEmployeeToDelete(null);
        });
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  // Function to format a date string as MM/DD/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div className='holder'>
      <h1>Employee List</h1>
      {/* <SelectEmployee employees={employees} onSelect={handleEmployeeSelection} /> */}
     <div className='table-holder'>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} >
              <td>{`${employee.first_name} ${employee.last_name}`}</td>
              <td>{employee.DOB}</td>
              <td>{employee.start_date}</td>
              <td>{employee.end_date}</td>
              <td><div dangerouslySetInnerHTML={{ __html: employee.description }} /></td>
              <td>
                <DropdownMenu
                  onView={() => handleView(employee)}
                  onUpdate={() => handleUpdate(employee)}
                  onDelete={() => confirmDelete(employee)}
                  />
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this employee?</p>
            <div className="delete-modal-buttons">
              <button onClick={handleDelete}>Delete</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
