const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 1000;

//Importing for the database.
const mongoose = require('mongoose');
const connectDatabase = require('./config/databaseConnect');

// Import for the routes 
const goalsRouter = require('./routes/goalRoutes');

//Importing the middlewares.
const errorHandler = require('./middleware/errorHandler');

const app = express();

//Connecting to database
connectDatabase();

//Adding middleware for parsing the requests.
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Defined routes.
app.use('/api/goals', goalsRouter);

//Middleware for error handling.
app.use(errorHandler);

mongoose.connection.on('open', () => {
    console.log('Connected to the database successfully.');
    app.listen(PORT, () => {
        console.log(`Listening to PORT ${PORT}`);
    })
})

