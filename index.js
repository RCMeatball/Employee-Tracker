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
