drop database if exists employeeDB;
create database employeeDB;
use employeeDB;

create table department(
id int not null auto_increment primary key,
name varchar(30) not null
);

create table role (
id int not null auto_increment primary key,
title varchar(30) not null,
salary decimal(10, 2),
department_id int
);

create table employee (
id int not null auto_increment primary key,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int,
manager_id int
);

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS Department, role.salary, CONCAT(employee.first_name, ' ' ,employee.last_name) AS Manager FROM employee INNER JOIN role on role.id =employee.role_id INNER JOIN department on department.id = role.department_id;
SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;
SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;


INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Marketing");



INSERT INTO role (title, salary, department_id)
VALUE ("Senior Engineer", 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Team lead", 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("BA", 100000, 4);




INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jason", "Munkhuu", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Nathan", "Mugi", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Meg", "Byamba", null, 3);


select * from employee;
select * from department;
select * from role;