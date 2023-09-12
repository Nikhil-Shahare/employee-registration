const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

router.post("/Add-Employee", async (req, res) => {
  try {
    await Employee.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      DOB: req.body.dob,
      start_date: req.body.startDate,
      end_date: req.body.endDate,
      salary: req.body.currentSalary,
      description:req.body.description,
      study:req.body.education
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;
