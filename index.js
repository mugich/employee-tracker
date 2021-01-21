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
      choices: ["View department", "View roles", "View employees"]
    })
    .then(function(answer){
      if (answer.action === "View department"){
        viewDepartment();
      }
      else if(answer.action === "View roles"){
        viewRoles();
      }
      else if(answer.action ==="View employees"){
        viewEmployees();
      }
      else{
        connection.end();
      }
    });
}