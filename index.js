
const inquirer = require('inquirer');
require('dotenv').config();
const express = require('express');
const dataTable = require('console.table');
const mysql = require('mysql2');
// const db = require('./db/connection');

const app = express();

// Express middleware
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
            }) 
        }
    })
}

dbTracker();

        
    



