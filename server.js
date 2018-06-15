'use strict'

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mysql      = require('mysql');

const pwd = require('./pswd').pwd

const port = process.env.PORT || 3000

const connection = mysql.createConnection({
  host     : 'den1.mysql6.gear.host',
  user     : 'deployment3',
  password : 'Ov8FI_Ydd7N?',
  database : 'deployment3'
});

let app = express();

app.use(bodyParser.json());
app.use(cors());

connection.connect();

app.get('/', function(req, res) {
  connection.query('SELECT * FROM employees', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
    //connection.end();
  });
})

app.post('/', function(req, res) {
  /* Update the database here */
  // console.log(`INSERT INTO employees (employeeNumber, lastName, firstName, extension, email, officeCode, reportsTo, jobTitle) VALUES (${req.body.employeeNumber}, "${req.body.lastName}", "${req.body.firstName}", ""${req.body.extension}"", ""${req.body.email}, "${req.body.officeCode}", "reportsTo", "${req.body.jobTitle}")`);
  connection.query(`INSERT INTO employees (employeeNumber, lastName, firstName, extension, email, officeCode, reportsTo, jobTitle) VALUES (${req.body.employeeNumber}, "${req.body.lastName}", "${req.body.firstName}", "${req.body.extension}", "${req.body.email}", ${req.body.officeCode}, ${req.body.reportsTo}, "${req.body.jobTitle}")`, function(error, results, fields) {
    if (error) throw error;
    res.send('entry created');
  })
  //res.send('created')

})

app.delete('/:id', (req, res) => {
  console.log(req.params.id);
  connection.query('DELETE FROM employees WHERE employeeNumber =' + req.params.id, function(error, results, fields) {
    if (error) throw error;
      res.send('deleted: ' + req.params.id)
  });

})


  // res.send([
  //   {title: 'The Godfather', year: 1969, genre: 'Drama', seen: true},
  //   {title: 'Fantasia', year: 1939, genre: 'Fantasy', seen: false},
  //   {title: 'Kubo and the Two Strings', year: 2015, genre: 'Animated', seen: true},
  //   {title: 'The Wind That Shakes the Barley', year: 2006, genre: 'Drama', seen: false}
  // ])


app.listen(port);
