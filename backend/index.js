const app = require("./app")
require("dotenv").config()
const express =require("express")
const connectDatabase = require("./database/database")
const {PORT} = process.env
const cors = require("cors")
connectDatabase();
const corsOptions = {
    origin: 'http://127.0.0.1:5173', // Replace with the actual URL of your front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (if needed)
    optionsSuccessStatus: 204, // Set the response status for preflight requests
  };
  
  app.use(cors(corsOptions)); // Enable CORS with the specified options
  

//importing routes  
const createEmployee = require("./routes/createEmployee")
const getEmployee = require("./routes/getEmployee")
const getoneemployee = require("./routes/getoneemployee")
const updateEmployee = require("./routes/updateEmployee")
const deleteEmployee = require("./routes/deleteEmployee")
//Routes
app.use(express.json());
app.use("/DeliveryBoy",createEmployee)
app.use("/DeliveryBoy",getEmployee)
app.use("/DeliveryBoy",getoneemployee)
app.use("/DeliveryBoy",updateEmployee)
app.use("/DeliveryBoy",deleteEmployee)





app.listen(PORT,(req,res)=>{
    console.log(`server is listening to port ${PORT}`)
})