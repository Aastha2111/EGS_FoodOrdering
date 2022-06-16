const express =require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

require('../db/conn');
const User=require('../modal/userSchema');

//get only res
router.get('/',(req,res)=>{
    res.send(`router get`)
});


//get data from url also + secure
// router .post('/register',(req,res)=>{
//     console.log(req.body);
//     // res.json({message:req.body});
//     // object destructuring
//     const { name,address, email, phone, password, password_confirmation,GST,res_type} = req.body;
//     if (!name || !address|| !email || !phone || !password|| !password_confirmation|| !GST|| !res_type) {

//         //  ----- -client error -422
//         return res.status(422).json({ error: "plx filled the field propertly " })

        
//     }
//PROMISES
//     //  ---------------  database : user filling email perform  matching
//     User.findOne({ email :email}).then((userExist) =>{
//         if(userExist){
//             return res.status(422).json({error :"Email already exist"})
//         }
// //new document created
//         const user =new User({name,address, email, phone, password, password_confirmation,GST,res_type});
//         user.save().then(()=>{
//             res.status(201).json({ message: "user registered successfully " });
//         }).catch((err)=> {res.status(500).json({error :"Failed to register"})});
//     }).catch(err => { console.log(err); });

// });



// //Async Await
router .post('/register',async(req,res)=>{
    const { name,address, email, phone, password, password_confirmation,GST,res_type} = req.body;
    if (!name || !address|| !email || !phone || !password|| !password_confirmation|| !GST|| !res_type) {

        //  ----- -client error -422
        return res.status(422).json({ error: "plx filled the field propertly " })

        
    }
    try{
        const userExist= await User.findOne({email:email});
         if(userExist){
            return res.status(422).json({error :"Email already exist"});
          
         }else if(password!=password_confirmation){
            return res.status(422).json({error :"Email already not matching"});
         }
         const user =new User({name,address, email, phone, password, password_confirmation,GST,res_type});
         //encrypting the password
         //in userSchema file
         await user.save();
         res.status(201).json({message :"user register succeful"});
    }catch(err){
        console.log(err);
    }



});


router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "plx filled the field propertly " })

        
    }
  
        const MailExist= await User.findOne({email:email});
        // console.log(`++++++++++${MailExist}`);
        if(MailExist){
            const isMatch =await bcrypt.compare(password,MailExist.password);
            
           
            if(isMatch){
                // it returns promise the await
                const token= await MailExist.generateAuthToken();
                console.log(token);
                res.cookie("jwtoken",token,{
                    expires : new Date(Date.now()+259800),
                    httpOnly : true,
                });
                  

                return res.status(201).json({message :"Loggin succesful"})
                 
                
            }
            else{
                //400 invalide credentail
                return res.status(400).json({message :"inValid Credential"});
            }
                
        }else{
            return res.status(400).json({message :"inValid Credential"});
        }
    }catch(err){
        console.log(err);
    }
});

// home page
// router.get('/about',(req,res)=>{
//     console.log('hello my about');
//     res.send(`hello about world from the server`);
// });

module.exports =router;