const express = require('express');

const { Pool } = require('pg');

let path = require("path");

let security = false 

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');


const knexMain = require('knex') ({
    client : 'pg',
    connection : {
        host :  'localhost',
        user : 'postgres',
        password : 'Ilovemom2!',
        database : 'intexMain',
        port: 5432,
    }
})

const knexStaff = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'password',
        database: 'intexemployee', 
        port: 5432,
    }
});

knexStaff.raw('SELECT 1+1 AS result')
    .then(() => console.log('Database connection successful'))
    .catch(error => {
        console.error('Database connection failed:', error);
    });

app.get('/staffView', (req, res) => {
    knexStaff('employeetable') // Fetching from the `employee` table in the `intexStaff` database
      .select(
        'emp_id',
        'emp_first_name',
        'emp_last_name',
        'emp_email',
        'emp_phone',
        'emp_username',
        'emp_password'
      )
      .then(employeeData => {
        res.render('staffView', {employees: employeeData});
      })
      .catch(error => {
        console.error('Error querying database:', error);
      });
  });
  

app.get('/staffView', (req, res) => {
    knexStaff('employee') // Fetching from the `employee` table in the `intexStaff` database
      .select(
        'emp_id',
        'emp_first_name',
        'emp_last_name',
        'emp_email',
        'emp_phone',
        'emp_username',
        'emp_password'
      )
      .then(employeeData => {
        res.render('staffView', {employees: employeeData });
        // Right now, nothing is done with `employeeData`
      })
      .catch(error => {
        console.error('Error querying database:', error);
      });
  });
  

// Middleware to parse URL-encoded data
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));


const port = 3010;

// Route for the index.ejs file
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs file
});

// Route for the addEvent.ejs file
app.get('/addEvent', (req, res) => {
    res.render('addEvent'); // Render the addEvent.ejs file
});


app.get('/staffLogin', (req, res) => {
    res.render('staffLogin', { errorMessage: null }); // Pass errorMessage as null initially
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});