const express =require('express');
const mongoose= require('mongoose');
const dotenv =require('dotenv');
const app = express();
app.use(express.json())


//requiring file
require('./db/conn')
// // we link the router files to make our route easy
app.use(require('./router/auth'));

// app.get('/',(req,res)=>{
//     res.send("home");
// })
// app.get('/login',(req,res)=>{
//     res.send("login");
// })
dotenv.config({ path: './config.env' })
const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    //javascript/variable object use ke backticks
    console.log(`backend server running on this ${PORT}`);
})
