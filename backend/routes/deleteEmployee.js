// Import necessary modules and models
const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

// Create a route to delete an employee by ID
router.delete("/delete-employee/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    
    // Use the Employee model to find and remove the employee by ID
    await Employee.findByIdAndRemove(employeeId);
    
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;