const mongoose= require('mongoose');
// const DB= process.env.DATABASE;

const DB ='mongodb+srv://Egs:Egs@cluster0.13wdpvr.mongodb.net/foodordering?retryWrites=true&w=majority';
mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => {
    console.log(`connection is successful`);
}).catch((err)=>{console.log(`mongoose connection occur ${err} `);});