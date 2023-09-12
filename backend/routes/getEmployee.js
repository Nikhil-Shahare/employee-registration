const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

router.get("/Get-Employee", async (req, res) => {
    try {
      // Retrieve all employee records from the database
      const employees = await Employee.find();
  
      // Send the retrieved employee data as a response
      res.json(employees);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while fetching employees" });
    }
  });
  
  module.exports = router;