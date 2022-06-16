const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
  
    password: {
        type: String,
        required: true
    },
    password_confirmation: {
        type: String,
        required: true
    },
    GST: {
        type: String,
        required: true
    },
    res_type: {
        type: String,
        required: true
    },tokens:[
        {token :{
            type:String,
            required:true
        }}
    ]

  
});





userSchema.pre('save',async function(next){
    if(this.isModified('password')){        //isModified takes care only if there are any updates in password // bcoz will adding token save() fir se invoke hoga
       const hash= await bcrypt.hash(this.password,12);   // if no await -> then ouput will be promise
        const hash_c = await bcrypt.hash(this.password_confirmation,12);
        this.password =hash;
        this.password_confirmation =hash_c;
        // console.log(`)))))))))))))${hash}`);

    }
    next();
})


//we are generating token for the user
//2 methods of jwt
//jwt.sign(payload,secretOrPrivateKey,[options,callback])
//jwt.verify
userSchema.methods.generateAuthToken=async function(){
 try{
    let tokengenerate =jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:tokengenerate});
    await this.save();
    // console.log(`***************token genrate ${tokengenerate}`)
    return tokengenerate;

 }catch (err){
    console.log(err);
 }
}

//Collections creation
const User = mongooose.model('USER', userSchema);

module.exports = User;