const inquirer = require("inquirer");
const { Pool } = require("pg");

const pool = new Pool(
  {
    user: "postgres",
    password: "Winnie@99",
    host: "localhost",
    database: "employees_db",
  },
  console.log("Connected to the  database")
);
pool.connect();

const employees_db = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      const { options } = answers;

      switch (options) {
        case "View Employees":
          viewEmployees();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View departments":
          viewDepartments();
          break;
        case "Add a employee":
          addEmployee();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
      }
    });
};

const viewEmployees = () => {
  pool.query(
    "SELECT id, first_name, last_name, role_id, manager_id FROM employee",
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Showing all employees");
      employees_db();
    }
  );
};

const viewRoles = () => {
  pool.query(
    "SELECT id, title, salary, department_id FROM role",
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Showing all roles");
      employees_db();
    }
  );
};

const viewDepartments = () => {
  pool.query("SELECT id, name FROM department", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(res.rows);
    employees_db();
  });
};

const addEmployee = () => {
    inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter employee first name",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter employee last name",
        },
        {
          type: "input",
          name: "roleId",
          message: "Enter employee role ID",
        },
        {
          type: "input",
          name: "managerId",
          message: "Enter employee manager ID",
        },
      ])
      .then((answers) => {
        const { firstName, lastName, roleId, managerId } = answers;
        pool.query('INSERT INTO employee (first_name, last_name, role_Id, manager_Id) VALUES(?, ?, ?, ?)'
            [firstName, lastName, roleId, managerId],
            (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`Employee added: ${firstName} ${lastName}`);
                employees_db();
            }
        );
      });
    };

    const addRole = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "Enter new role title",
            },
            {
                type: "input",
                name: "roleDepartment",
                message: "Enter new role department",
            },
            {
                type: "input",
                name: "roleSalary",
                message: "Enter new role salary",
            }
        ])
        .then((answers) => {
            const { roleTitle, roleDepartment, roleSalary } = answers;
            pool.query(
                'INSERT INTO role (title, department_id, salary) VALUES(?, ?, ?)',
                [roleTitle, roleDepartment, roleSalary],
                (err, res) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(`Added the new role of ${roleTitle}`);
                    employees_db();
                }
            );
        });
    };

    const addDepartment = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "departmentName",
                message: "Enter the new department name"
            }
        ])
        .then((answers) => {
            const { departmentName } = answers;
            pool.query('INSERT INTO department (name) VALUES(?)',
                [departmentName],
                (err, res) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(`Added the new department of ${departmentName}`);
                    employees_db();
                }
            );
        });
    };

    const updateEmployeeRole = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "employeeId",
                message: "Enter ID for employee to be updated"
            },
            {
                type: "input",
                name: "newRoleId",
                message: "Enter the employees new role ID"
            }
        ])
        .then((answers) => {
            const { employeeId, newRoleId } = answers;
            pool.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [newRoleId, employeeId],
                (err, res) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(`Updated Employee with ID ${employeeId} to their new role of ${newRoleId}`);
                    employees_db();
                }
            );
        });
    };

    employees_db();
