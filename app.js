const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/APIAuthentication');


const app = express();

//middlewares

app.use(logger('dev')); 
app.use(bodyParser.json());

//routes
app.use('/users',require('./routes/users'));


//start the server
const port = process.env.port || 5000;
app.listen(port,()=>{
    console.log("server is running on ",port);
})
