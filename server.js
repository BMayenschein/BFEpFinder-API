const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/database')
const logger = require('morgan')

const mainRoutes = require('./routes/main')

require('dotenv').config({path: './config/.env'})

connectDB();



app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(logger("dev"))

app.use('/', mainRoutes)

//For all non existing routes
app.get('*', function(req, res) {
    res.status(404).send("This page doesn't exist")
})

app.listen(process.env.PORT, () => {
    console.log('server listening on port 5000')
})