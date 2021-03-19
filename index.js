const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config( { path : 'config.env'} )

//Server Port
const PORT = process.env.PORT || 3000

const userRouter = require("./app/routes/users");


app.use(express.json());
app.use("/user", userRouter);

const connectDB = require('./app/database/connection');

//Database Connection via MOngoDB
connectDB();

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});