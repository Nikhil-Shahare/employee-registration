import React, { useState } from 'react';
import ReactQuill from "react-quill"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import "react-quill/dist/quill.snow.css"
import "./Registration.css"

const modules = {
  toolbar: [
   
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // Remove the link and color options
  ],
};

const formats = [
  'header',
  'list',
  'bold',
  'italic',
  'underline',
  // Add other formats as needed
];


const Check = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    education: '',
    startDate: '',
    endDate: '',
    currentSalary: '',
    description: '',
  });
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    dob: Yup.date().required('Date of Birth is required'),
    education: Yup.string().required('Education is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date().required('End Date is required'),
    currentSalary: Yup.number().required('Current Salary is required'),
    description: Yup.string().required('Description is required'),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form submission or data processing here
    console.log(formData);
  };
  const handleCancel = () => {
    setFormData({ ...initialFormData }); // Reset the form fields to empty
  };

  return (
  <div className='container'>
       <div className='form-header'>
         <h1>Employee Registration Form</h1>
       </div>
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name:</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
            />
        </div>

        <div className='form-group'>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
            />
        </div>

        <div className='form-group'>
          <label htmlFor='dob'>Date of Birth (DOB):</label>
          <input
            type='date'
            id='dob'
            name='dob'
            value={formData.dob}
            onChange={handleChange}
            required
            />
        </div>

        <div className='form-group'>
          <label htmlFor='education'>Education:</label>
          <input
            type='text'
            id='education'
            name='education'
            value={formData.education}
            onChange={handleChange}
            required
            />
        </div>

        <div className='form-group'>
          <label htmlFor='startDate'>Start Date:</label>
          <input
            type='date'
            id='startDate'
            name='startDate'
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='endDate'>End Date:</label>
          <input
            type='date'
            id='endDate'
            name='endDate'
            value={formData.endDate}
            onChange={handleChange}
            required
            />
        </div>

        <div className='form-group'>
          <label htmlFor='currentSalary'>Current Salary:</label>
          <input
            type='number'
            id='currentSalary'
            name='currentSalary'
            value={formData.currentSalary}
            onChange={handleChange}
            required
            />
        </div>

        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <ReactQuill
            id='description'
            name='description'
            modules={modules}
            formats={formats}
            value={formData.description}
            onChange={handleChange}
            required
            />
        </div>

        <button type='submit'>Submit</button>
        <button type='button' onClick={handleCancel}>Cancel</button>
      </form>
    </div>
            </div>
  );
};

export default Check;
