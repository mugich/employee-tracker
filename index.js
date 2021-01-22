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
      choices: ["View department", "View roles", "View all employees", "Add department", "Add roles", "Add employees", "Update Employee roles", "EXIT"] 
    })
    .then(function(answer){
      if (answer.action === "View department"){
        viewDepartment();
      }
      else if(answer.action === "View roles"){
        viewRoles();
      }
      else if(answer.action ==="View employees"){
        viewAllEmployees();
      }
      else{
        connection.end();
      }
    });
}

function viewDepartment() {

  connection.query("select * from department", function(err, result){
    if(err) throw err;
    console.log(result);
    init();
  });
}
function viewRoles() {
  connection.query("select * from role", function(err, result){
    if(err) throw err;
    console.log(result);
    init();
  });
}
function viewAllEmployees() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS Department, role.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
   function(err, result){
    if(err) throw err;
    console.table(result);
    init();
  });
}

