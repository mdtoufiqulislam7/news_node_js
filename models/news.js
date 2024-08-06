const mongoose = require('mongoose')



const newsfeed = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    discription:String,
    teg: String,
    url:String

})

module.exports = mongoose.model('news',newsfeed)