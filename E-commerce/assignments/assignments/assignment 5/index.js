const express =require('express');
const mongoose=require('mongoose')
// const userRoutes=require("./routes/userRoutes")
const studentRoutes=require('./routes/studentRoutes')
const PORT=8000
const app=express()

const cors = require('cors')
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials: true
}))
mongoose.connect("mongodb+srv://myAtlasDBUser:Sanjeevi@myatlasclusteredu.bdisful.mongodb.net/?appName=myAtlasClusterEDU")
.then(()=>{console.log('connected to DB')})
.catch((err)=>{
    console.log(err)
})
//middleware used to pass the data
app.use(express.json())

// app.get('/',(req,res)=>{
//     res.send('hello 🤐')

// }) 

app.use(studentRoutes)
app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})