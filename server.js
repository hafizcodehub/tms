const express = require('express');
const color = require('colors');
const connection = require('./config/db')
const router = require('./Routers/authRouter')
const cors = require('cors')

const app = express();
app.use(express.json());

app.use(cors())

// database connectivity function
connection()

// router call 
app.use("/Api/v1", router)
PORT = 5000;
app.listen(PORT, ()=>
{
    console.log(`Server is running at ${PORT}` .bgGreen);
})