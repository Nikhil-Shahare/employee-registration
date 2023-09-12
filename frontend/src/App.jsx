import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Registration from './Screens/New'
import EmployeeList from './Screens/employeeList'
import EmployeeDetails from './Screens/EmployeeDetails'
import Navbar from './Screens/Navbar';

import Update from './Screens/Update';
import Check from './Screens/Registration';
import Updating from './Screens/newUpdate';
// import Registration from './Screens/Registration'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path='/' element={<Registration/>}></Route>
        <Route path="/updateemployee/:id" element={<Updating />} />
        <Route path='/employee' element={<EmployeeList/>}></Route>
        <Route path='/employee/:id' element={<EmployeeDetails/>}></Route>

      </Routes>
    </Router>
  )
}

export default App
