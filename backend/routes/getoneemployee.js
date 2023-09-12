const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

// Route to get an employee by ID
router.get("/Get-Employee/:id", async (req, res) => {
  try {
    // Retrieve the employee record by ID from the database
    const employee = await Employee.findById(req.params.id);

    // Check if the employee with the specified ID exists
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Send the retrieved employee data as a response
    res.json({
        firstName: employee.first_name,
        lastName: employee.last_name,
        dob: employee.DOB,
        education: employee.study,
        startDate: employee.start_date,
        endDate: employee.end_date,
        currentSalary: employee.salary,
        description: employee.description,
      });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching the employee" });
  }
});

module.exports = router;