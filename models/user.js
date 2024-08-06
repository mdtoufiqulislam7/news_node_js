const mongoose = require('mongoose')

const usermodel = new mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    password:String,
    email:String,
    phone:String,
    type:String,

})


module.exports = mongoose.model('users',usermodel)