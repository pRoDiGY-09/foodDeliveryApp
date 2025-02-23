const mongoose = require('mongoose');
const restuarantSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    address:{
        type:String,
        
    },
    pincode:{
        type:Number,
        
    },
    phone:Number,
    email:String,
    allows:{
        type:String,
        
    }
})

module.exports = mongoose.model('Restuarant', restuarantSchema);