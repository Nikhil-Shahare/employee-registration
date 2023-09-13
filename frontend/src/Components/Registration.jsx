import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Registration.css';
import axios from "axios"

const modules = {
    toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }]],
};

const formats = ['header', 'list', 'bold', 'italic', 'underline'];

const initialValues = {
    firstName: '',
    lastName: '',
    dob: '',
    education: '',
    startDate: '',
    endDate: '',
    currentSalary: '',
    description: '',
};

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

const Registration = () => {
    const handleDescriptionChange = (value, formik) => {
        formik.setFieldValue('description', value);
    };




    const handleSubmit = async (values,{resetForm}) => {
        try {
            // Send the form data to your backend
            const response = await axios.post('http://localhost:4000/DeliveryBoy/Add-Employee', values);
        
            // Check if the request was successful
            if (response.data.success) {
              // Reset the form after successful submission
            //   resetForm({ values: initialValues });
              console.log('Data sent successfully:', response.data);
            } else {
              console.error('Failed to send data:', response.data);
            }
            console.log(values)
          } catch (error) {
            console.error('Error sending data:', error);
          }

    };

    const handleCancel = (formik) => {
        formik.resetForm(); // Reset the form fields to their initial values
    };

    return (
        <div className='container'>
            <div className='form-header'>
                <h1>Employee Registration Form</h1>
            </div>
            <div className='form-container'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => (

                        <Form>
                            <div className='wrapper'>

                            <div className='form-group'>
                                <label htmlFor='firstName'>First Name*</label>
                                <Field type='text' id='firstName' name='firstName' placeholder="Enter your name"/>
                                <ErrorMessage name='firstName' component='div' className='error' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='lastName'>Last Name*</label>
                                <Field type='text' id='lastName' name='lastName' placeholder="Enter your name" />
                                <ErrorMessage name='lastName' component='div' className='error' />
                            </div>

                            </div>
                            <div className='form-group'>
                                <label htmlFor='dob'>DOB</label>
                                <Field type='date' id='dob' name='dob' />
                                <ErrorMessage name='dob' component='div' className='error' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='education'>Study</label>
                                <Field type='text' id='education' name='education' placeholder ="B.E" />
                                <ErrorMessage name='education' component='div' className='error' />
                            </div>
<div className='wrapper'>

                            <div className='form-group'>
                                <label htmlFor='startDate'>Start Date</label>
                                <Field type='date' id='startDate' name='startDate' />
                                <ErrorMessage name='startDate' component='div' className='error' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='endDate'>End Date</label>
                                <Field type='date' id='endDate' name='endDate' />
                                <ErrorMessage name='endDate' component='div' className='error' />
                            </div>
</div>

                            <div className='form-group'>
                                <label htmlFor='currentSalary'>Current Salary</label>
                                <Field type='number' id='currentSalary' name='currentSalary' placeholder ="30000" />
                                <ErrorMessage name='currentSalary' component='div' className='error' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='description'>Description:</label>
                                <ReactQuill
                                    id="description"
                                    name="description"
                                    modules={modules}
                                    formats={formats}
                                    value={formik.values.description}
                                    onChange={(value) => handleDescriptionChange(value, formik)}
                                />
                                <ErrorMessage name='description' component='div' className='error' />
                            </div>

                            <div className='form-buttons'>
                                <button
                                    type='button'
                                    onClick={() => handleCancel(formik)}
                                    className='button button-cancel'
                                >
                                    Cancel
                                </button>

                                <button type='submit' className='button button-save'>Save</button>
                        
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Registration;
