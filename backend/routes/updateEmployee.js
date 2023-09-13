const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

// Update an employee by ID
router.put("/update-employee/:id", async (req, res) => {
  try {
    // Find the employee by ID
    const employee = await Employee.findById(req.params.id);

    // Check if the employee with the specified ID exists
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Update the employee's fields
    employee.first_name = req.body.firstName;
    employee.last_name = req.body.lastName;
    employee.DOB = req.body.dob;
    employee.start_date = req.body.startDate;
    employee.end_date = req.body.endDate;
    employee.salary = req.body.currentSalary;
    employee.description = req.body.description;
    employee.study = req.body.education;

    // Save the updated employee record
    await employee.save();

    // Send a success response
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while updating the employee" });
  }
});

module.exports = router;
