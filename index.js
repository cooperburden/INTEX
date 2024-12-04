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
      .orderBy('emp_id', 'asc')
      .then(employeeData => {
        res.render('staffView', {employees: employeeData});
      })
      .catch(error => {
        console.error('Error querying database:', error);
      });
  });
  

// Middleware to parse URL-encoded data
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(express.json());


const port = 3010;

// Route for the index.ejs file
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs file
});

// Route for the addEvent.ejs file
app.get('/addEvent', (req, res) => {
    res.render('addEvent'); // Render the addEvent.ejs file
});

//route for the staffLogin.ejs

app.get('/staffLogin', (req, res) => {
    res.render('staffLogin', { errorMessage: null }); // Pass errorMessage as null initially
});

// Handle login form submission
app.post("/StaffLogin", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query the employee table using Knex
        const employee = await knexStaff("employeetable")
            .select("emp_username", "emp_password")
            .where({ emp_username: username, emp_password: password })
            .first();

        if (employee) {
            // Redirect to staffView.ejs if login is successful
            res.render("staffView", { user: `${employee.emp_first_name} ${employee.emp_last_name}` });
        } else {
            // If no match, reload login with error message and clear inputs
            res.render("staffLogin", {
                error: "Invalid username or password",
                username: "",
                password: "",
            });
        }
    } catch (err) {
        console.error("Error during login process:", err);
        res.status(500).send("Internal Server Error");
    }
});


<<<<<<< HEAD
=======

app.post("/staffLogin", async (req, res) => {
    const { emp_username, emp_password } = req.body;

    console.log("Username:", emp_username); // Debug log
    console.log("Password:", emp_password); // Debug log

    try {
        // Query the employee table for the logged-in user
        const employee = await knexStaff("employeetable")
            .select("emp_username", "emp_password", "emp_first_name", "emp_last_name")
            .where("emp_username", emp_username)
            .andWhere("emp_password", emp_password)
            .first();

        if (employee) {
            // Query all employees to pass to staffView.ejs
            const employees = await knexStaff("employeetable").select(
                "emp_id",
                "emp_first_name",
                "emp_last_name",
                "emp_email",
                "emp_phone",
                "emp_username"
            );

            // Render the staffView page with user and employees data
            res.render("staffView", { 
                user: `${employee.emp_first_name} ${employee.emp_last_name}`,
                employees 
            });
        } else {
            // If no match, reload login with error message
            res.render("staffLogin", {
                errorMessage: "Invalid username or password",
            });
        }
    } catch (err) {
        console.error("Error during login process:", err);
        res.status(500).send("Internal Server Error");
    }
});


 






>>>>>>> a84906442d1938646701176c7f50ecd33c58d3fb
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});