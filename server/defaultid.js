
const bcrypt = require('bcrypt');
const Employee = require('./models/EmployeeCredentials'); 

async function createDefaultEmployee() {
  const defaultId = 101;
  const defaultPassword = 'admin@123';

  const existing = await Employee.findOne({ where: { Employee_Id: defaultId } });
  if (existing) {
    console.log('Default employee already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  await Employee.create({
    Employee_Id: defaultId,
    Password: hashedPassword
  });

  console.log('Default employee created');
}

createDefaultEmployee()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
