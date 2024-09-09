DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- table for the departments
CREATE TABLE deparments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    
);

-- table for the roles within the company
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    department_id INT NOT NULL,
    salary DECIMAL(10,2),
    FOREIGN KEY (department_id) REFERENCES deparments(id)
);

-- table for employees
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)

);

INSERT INTO deparments (name) VALUES
('Finance')
('Sales')
('Legal')
('Engineer');

INSERT INTO role (title, salary, department_id) VALUES
('Lawyer', 190000, 3),
('Legal Team Lead', 250000, 3),
('Lead Engineer', 150000, 4),
('Software Engineer', 120000, 4),
('Accountant', 125000, 1),
('Account Manager', 160000, 1),
('Sales Lead', 100000, 2),
('Salesperson', 80000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John','Doe', 7, null)
('Mike','Chan', 8, 1)
('Ashley','Rodriguez', 3, null)
('Kevin','Tupik', 4, 3)
('Kunal','Singh', 6, null)
('Malia','Brown', 5, 5)
('Sarah','Lourd', 2, null)
('Tom','Allen', 1, 7);