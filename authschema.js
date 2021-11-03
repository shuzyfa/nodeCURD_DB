const mongoose = require('mongoose');
const authSchema = mongoose.Schema({
    name:{type:String},
    number:{type:Number},
    address:{type:String},
    email:{type:String},
    password:{type:String}
})
const authModel = mongoose.model('authData',authSchema)
module.exports= authModel