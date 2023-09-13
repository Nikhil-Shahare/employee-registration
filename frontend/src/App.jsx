import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Registration from './Components/Registration';
import EmployeeList from './Components/employeeList';
import EmployeeDetails from './Components/EmployeeDetails';
import Navbar from "./Components/Navbar"
import Update from './Components/Update';


function App() {

  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path='/' element={<Registration/>}></Route>
        <Route path="/updateemployee/:id" element={<Update />} />
        <Route path='/employee' element={<EmployeeList/>}></Route>
        <Route path='/employee/:id' element={<EmployeeDetails/>}></Route>

      </Routes>
    </Router>
  )
}

export default App
