import React, { useState,useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Registration.css';
import axios from "axios"
import { useParams } from 'react-router-dom';

const modules = {
    toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }]],
};
const formats = ['header', 'list', 'bold', 'italic', 'underline'];




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

const Update = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    
    useEffect(() => {
        // Fetch employee details based on the ID from the URL parameter
        const getdata = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/DeliveryBoy/Get-Employee/${id}`);
                if (response.data) {
                    setEmployee(response.data);
                    console.log(employee)
                }
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        } 
      
        getdata();
    }, [id]); 
    const handleDescriptionChange = (value, formik) => {
        formik.setFieldValue('description', value);
    };
    console.log("this is first name",employee.first_name)
    let initialValues = {
        firstName: employee.first_name,
        lastName:employee.last_name,
        dob: employee.DOB,
        education: employee.study,
        startDate: employee.start_date,
        endDate: employee.end_date,
        currentSalary: employee.salary,
        description: employee.description,
    };
  console.log("this are initial values",initialValues)


    const handleSubmit = async (values,{resetForm}) => {
        try {
            // Send the form data to your backend
            const response = await axios.post(`http://localhost:4000/DeliveryBoy/update-Employee/${id}`, values);
        
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
                            <div className='form-group'>
                                <label htmlFor='firstName'>First Name:</label>
                                <Field type='text' id='firstName' name='firstName' />
                                <ErrorMessage name='firstName' component='div' className='error' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='lastName'>Last Name:</label>
                                <Field type='text' id='lastName' name='lastName' />
                                <ErrorMessage name='lastName' component='div' className='error' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='dob'>Date of Birth (DOB):</label>
                                <Field type='date' id='dob' name='dob' />
                                <ErrorMessage name='dob' component='div' className='error' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='education'>Education:</label>
                                <Field type='text' id='education' name='education' />
                                <ErrorMessage name='education' component='div' className='error' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='startDate'>Start Date:</label>
                                <Field type='date' id='startDate' name='startDate' />
                                <ErrorMessage name='startDate' component='div' className='error' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='endDate'>End Date:</label>
                                <Field type='date' id='endDate' name='endDate' />
                                <ErrorMessage name='endDate' component='div' className='error' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='currentSalary'>Current Salary:</label>
                                <Field type='number' id='currentSalary' name='currentSalary' />
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
                                >
                                    Cancel
                                </button>

                                <button type='submit'>Save</button>
                                {/* No need for a separate cancel button */}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Update;
