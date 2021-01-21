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
department_id int not null
);

create table employee (
id int not null auto_increment primary key,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int not null,
manager_id int not null
);

select * from department;
select * from role;
select * from employee;