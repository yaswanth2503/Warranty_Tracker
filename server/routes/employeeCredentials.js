const express = require('express');
const router = express.Router();
const Employee = require('../models/EmployeeCredentials');
const bcrypt = require('bcrypt');

const saltRounds = 10;


router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json({
        
       message: 'Employee Fetched succesfully' ,
       employees:employees
    }
    );
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json(
        { message: 'Server error' ,error:error.message}
    );
  }
});


router.post('/register', async (req, res) => {
  const { Employee_Id, Password } = req.body;
  try {
    // Don't hash password here, let Sequelize hook do it
    const newEmployee = await Employee.create({
      Employee_Id,
      Password // plain text here
    });

    res.status(201).json({
      message: 'Employee registered successfully',
      employee: {
        Employee_Id: newEmployee.Employee_Id
      }
    });
  } catch (error) {
    console.error('Error registering employee:', error);
    res.status(500).json({ message: 'Error registering employee', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { Employee_Id, Password } = req.body;
  console.log('Login request received:', req.body);

  try {
    const employee = await Employee.findOne({ where: { Employee_Id } });
    console.log('Employee fetched:', employee);

    if (!employee) {
      return res.status(401).json({ message: 'Invalid Employee Id or Password' });
    }

    
    console.log('Comparing passwords:', Password, employee.Password);
    const isMatch = await bcrypt.compare(Password, employee.Password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Employe or Password' });
    }

    res.status(200).json({
      message: 'Login Successful',
      employee: {
        Employee_Id: employee.Employee_Id
      }
    });

  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error in login', error: error.message });
  }
});
module.exports = router;




