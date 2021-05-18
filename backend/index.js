const bodyParser = require('body-parser');
const mysql = require("mysql2");
const express = require('express');

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "todolist",
//     password: "admin"
// });


const app = express();

const api = require('./routes/todolist.js');

api(app);

app.use(express.static('../dist'));

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('../dist/index.html');
});

app.listen(3000);

