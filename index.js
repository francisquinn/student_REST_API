const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const postRoute = require('./routes/post');



// connect to the database
mongoose.connect(process.env.DB_CONNECT);
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api', require("./routes/api"));
app.use('/api/post', postRoute);

app.use(function(error, req, res, next){
    res.status(422).send({error: error._message})
});

app.listen(process.env.port || 4001, function(){
    console.log("now listening for requests :)");
});