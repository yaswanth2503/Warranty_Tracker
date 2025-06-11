
const bcrypt = require('bcrypt');
const sequelize = require('../config/database')(); 
const employee_credentials = require('../models/employeeCredentials')(sequelize); 





const employees = [
  { Employee_Id: 610, Password: '610@ktt' },
  { Employee_Id: 611, Password: '611@ktt' },
  { Employee_Id: 612, Password: '612@ktt' },
  { Employee_Id: 613, Password: '613@ktt' },
  { Employee_Id: 614, Password: '614@ktt' }
];

async function insertEmployees() {
  try {
    console.log('Attempting database connection...');
    await sequelize.authenticate();
    console.log('Database connection successful!');

    console.log('Hashing passwords...');
    const hashed_password = await Promise.all(
      employees.map(async (emp) => {
        return {
          Employee_Id: emp.Employee_Id,
          Password: await bcrypt.hash(emp.Password, 10)
        };
      })
    );

    console.log('Inserting employees...');
    await employee_credentials.bulkCreate(hashed_password);
    console.log('Employees inserted successfully.');
  } catch (error) {
    console.error('Error inserting employees:', error.message);
    console.error('Full error:', error);
  } finally {
    await sequelize.close();
  }
}

insertEmployees();