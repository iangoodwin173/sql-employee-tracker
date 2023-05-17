const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
const express = require('express');
const dataTable = require('console.table');
const db = require('./db/connection');

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


db.connect(err=> {
    if (err) throw err;
    console.log('connected to employees_db');
    dbTracker();
})

const dbTracker = () => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Please choose an option:',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee']
    })
    .then((answer) => {
        if (answer.prompt == 'View Departments') {
            db.query(`SELECT * FROM department`, (err, result) => {
            if(err) throw err; 
            console.log('All Departments: ');
            console.table(result);
            dbTracker();
        })
    } 
    })
}



