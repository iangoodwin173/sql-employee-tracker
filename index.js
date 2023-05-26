
const inquirer = require('inquirer');
require('dotenv').config();
const express = require('express');
const dataTable = require('console.table');
const mysql = require('mysql2');




const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log('connected to employees_db')
    
);



db.connect();


function mainMenu() {
    console.log("-------------------------------");
    inquirer.prompt([{
        type: 'list',
        name: 'menu',
        message: 'Choose an option: ',
        choices: ['Menu', 'Quit']
    }])
    .then(answer => {
        const menuChoice = answer.menu;
        if(menuChoice === "Menu") {
            dbTracker();
        } else if (menuChoice === "Quit") {
            process.exit();
        }
    })
}


const dbTracker = () => {
    
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'Please choose an option:',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee']
    }])
    .then (answer => {
        const choice = answer.choice;
        if (choice === 'View Departments') {
            const deptTable = `SELECT * FROM department`;
            db.query(deptTable, (error, results) => {
                if(error) {
                    console.error('error in query', error);
                    return;
                }
            
                console.table(results);
                mainMenu();
            })
            
        } else if 
            (choice === 'View Roles') {
                const deptTable = `SELECT * FROM role`;
                db.query(deptTable, (error, results) => {
                    if(error) {
                        console.error('error in query', error);
                        return;
                    }
                
                    console.table(results);
                    mainMenu();
                }) 
               
        } else if 
        (choice === 'View Employees') {
            const deptTable = `SELECT * FROM employee`;
            db.query(deptTable, (error, results) => {
                if(error) {
                    console.error('error in query', error);
                    return;
                }
            
                console.table(results);
                mainMenu();
            }) 

            
            
           
        } else if 
        (choice === 'Add Department') {
            
            inquirer.prompt([
                {
                type: 'input',
                name: 'id',
                message: 'Please add the ID of the new department: ',
                },
                {
                type: 'input',
                name: 'name',
                message: 'Please add the new department name: '
                }
            ])
            .then(answers => {
                const {id, name} = answers;
                const query = `INSERT INTO department (id, name) VALUES (? , ?)`;
                db.query(query, [id, name], (error, results) => {
                    if(error) {
                        console.error('error adding information', error);
                        return;
                    }

                    console.log('Data entered successfully');
                    const newDeptTable = `SELECT * FROM department`;
                    db.query(newDeptTable, (error, results) => {
                        if(error) {
                            console.error('cannot show new table');
                        }
                        console.log("Here is your new table: ") 
                        console.table(results);
                        mainMenu();
                    })
                    
                })
            })
            
            

        } else if 
        (choice === 'Add Employee') {
            
            inquirer.prompt([
                {
                type: 'input',
                name: 'id',
                message: 'What is the ID of the new employee? '
                },
                {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the employee? ',
                },
                {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the employee? '
                },
                {
                type: 'input',
                name: 'roleID',
                message: 'What is the role ID of the new employee? '
                },
                {
                type: 'input',
                name: 'jobTitle',
                message: 'What is the job title of the new employee? '
                },
                {
                type: 'input',
                name: 'managerID',
                message: 'What is the ID of the manager this employee will report to? '
                },
                {
                type: 'input',
                name: 'deptID',
                message: 'What is the department ID of the new employee? '
                },
                {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the new employee? '
                }
            ])
            .then(answers => {
                const {id, firstName, lastName, roleID, jobTitle, managerID, deptID, salary} = answers;
                const query = `INSERT INTO employee (id, first_name, last_name, role_id, job_title, manager_id, department_id, salary) VALUES (? , ? , ? , ? , ? , ? , ? , ?)`;
                db.query(query, [id, firstName, lastName, roleID, jobTitle, managerID, deptID, salary], (error, results) => {
                    if(error) {
                        console.error('error adding information', error);
                        return;
                    }

                    console.log('Data entered successfully');
                    const newEmployeeTable = `SELECT * FROM employee`;
                    db.query(newEmployeeTable, (error, results) => {
                        if(error) {
                            console.error('cannot show new table');
                        }
                        console.log("Here is your new table: ") 
                        console.table(results);
                        mainMenu();
                    })
                    
                })
            }) 

            
            

        } else if 
        (choice === 'Add Role') {
            
            inquirer.prompt([
                {
                type: 'input',
                name: 'id',
                message: 'What is the ID of the new role? '
                },
                {
                type: 'input',
                name: 'title',
                message: 'What is the title of the new role? ',
                },
                {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the new role? '
                },
                {
                type: 'input',
                name: 'deptID',
                message: 'What is the department ID of the new role? '
                }
                
            ])
            .then(answers => {
                const {id, title, salary, deptID} = answers;
                const query = `INSERT INTO role (id, title, salary, department_id) VALUES (? , ? , ? , ?)`;
                db.query(query, [id, title, salary, deptID], (error, results) => {
                    if(error) {
                        console.error('error adding information', error);
                        return;
                    }

                    console.log('Data entered successfully');
                    const newRoleTable = `SELECT * FROM role`;
                    db.query(newRoleTable, (error, results) => {
                        if(error) {
                            console.error('cannot show new table');
                        }
                        console.log("Here is your new table: ") 
                        console.table(results);
                        mainMenu();
                    })
                    
                })
            }) 

            
            

        } else if 
        (choice === 'Update Employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the employee to update? '
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of the employee to update? '
                },
                {
                    type: 'input',
                    name: 'newEmployeeRole',
                    message: 'What is the new role of the employee? '
                },
                {
                    type: 'input',
                    name: 'newEmployeeRoleID',
                    message: 'What is the ID of this new employee role? '
                }
            ])
            .then(answers => {
                const {firstName, lastName, newEmployeeRole, newEmployeeRoleID} = answers;
                const queryID = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`;
                db.query(queryID, [newEmployeeRoleID, firstName, lastName], (error, results) => {
                    if(error) {
                        console.error("unable to update role ID", error);
                        return;
                    }
                    console.log("Successfully updated employee role");
                    
                })
                const queryTitle = `UPDATE employee SET job_title = ? WHERE first_name = ? AND last_name = ?`;
                db.query(queryTitle, [newEmployeeRole, firstName, lastName], (error, results) => {
                    if(error) {
                        console.error("unable to update job title", error);
                        return;
                    }
                    console.log("Successfully updated job title");
                    
                
                })
                db.query(`SELECT * FROM employee`, (error, results) => {
                    if(error) {
                        console.log("unable to show updated table", error);
                        return;
                    }
                    console.log("Here is your updated employee table: ");
                    console.table(results);
                    mainMenu();
                })
                
                
            })
            
        }
    })
}





dbTracker();

        
    



