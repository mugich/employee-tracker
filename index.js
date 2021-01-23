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
      else if(answer.action ==="Add department"){
        addDepartment();
      }
      else if(answer.action ==="Add roles"){
        addRoles();
      }
      else if(answer.action ==="Add employees"){
        addEmployees();
      }
      else if(answer.action ==="Update Employee roles"){
        updateEmployeeRoles();
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

 function selectManager(){
  managerArray = [];
  connection.query("SELECT first_name FROM employee WHERE manager_id IS NULL", function(err, res){
    
    if (err) throw err;
    for (var i = 0; i < res.length; i++){
      managerArray.push(res[i].first_name);
      // console.log(managerArray);

    }
  })
  return managerArray;
}

var manager = selectManager();

function selectRole(){
  var choiceArray = [];
  connection.query("select * from role", function(err, result){
    if(err) throw err;
  
  for (var i = 0; i < result.length; i++){
    choiceArray.push(result[i].title);
    // console.log(choiceArray);
   } })
  return choiceArray;
}

var role = selectRole();

function addEmployees(){
  

    inquirer.prompt([
      {
      type: "input",
      message: "What is the employee's first name?",
      name: "firstName"
    },
    {
      type: "input",
      message: "what is the employee's last name?",
      name: "lastName"
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "roleName",
      choices: role
    },
    {
      type: "rawlist",
      message: "Who is the employee's manager?",
      name: "managerName",
      choices: manager
    }
    ])
    .then(function (answer){

      var roleId = role.indexOf(answer.roleName) + 1
      var managerId = manager.indexOf(answer.managerName) + 1
      
      connection.query("insert into employee set ?",
    
        {
        first_name: answer.firstName, 
        last_name: answer.lastName,
        role_id: roleId,
        manager_id: managerId
      }),

      function(err){
        if(err) throw err;

        console.log("successfully!");
        console.table();
        init();
      }
     
  
    });


  }

  function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        connection.query("INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                init();
            }
        )
    })
  }
  function addRoles() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?"
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
  
          } 
      ]).then(function(res) {
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  init();
              }
          )
  
      });
    });
    }
    function updateEmployeeRoles() {
      connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
       if (err) throw err      
      inquirer.prompt([
            {
              name: "lastName",
              type: "rawlist",
              choices: function() {
                var lastName = [];
                for (var i = 0; i < res.length; i++) {
                  lastName.push(res[i].last_name);
                }
                return lastName;
              },
              message: "What is the Employee's last name? ",
            },
            {
              name: "roleName",
              type: "rawlist",
              message: "What is the Employee's new title? ",
              choices: role
            },
        ]).then(function(answer) {
          var roleId = role.indexOf(answer.roleName) + 1
          connection.query("UPDATE employee SET WHERE ?", 
          {
            last_name: answer.lastName
             
          }, 
          {
            role_id: roleId
             
          }, 
          function(err){
              if (err) throw err
              console.table(answer);
              init()
          })
    
      });
    });
  
    }