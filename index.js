var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Ankhaa123",

  database: "employeeDB"
});

connection.connect(function(err){
  if(err) throw err;
  init();
});

function init(){
  inquirer
  .prompt({
      name:"action",
      message: "What would you like to do?",
      type: "list",
      choices: ["View all department", "View all roles", "View all employees", "Add department", "Add roles", "Add employees", "Update Employee roles", "EXIT"] 
    })
    .then(function(answer){
      if (answer.action === "View all department"){
        viewAllDepartment();
      }
      else if(answer.action === "View all roles"){
        viewAllRoles();
      }
      else if(answer.action ==="View all employees"){
        viewAllEmployees();
      }
      else{
        connection.end();
      }
    });
}

function viewAllDepartment() {

  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, result){
    if(err) throw err;
    console.table(result);
    init();
  });
}
function viewAllRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
   function(err, result){
    if(err) throw err;
    console.table(result);
    init();
  });
}
function viewAllEmployees() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS Department, role.salary, CONCAT(employee.first_name, ' ' ,employee.last_name) AS Manager FROM employee INNER JOIN role on role.id =employee.role_id INNER JOIN department on department.id = role.department_id;",
   function(err, result){
    if(err) throw err;
    console.table(result);
    init();
  });
}

