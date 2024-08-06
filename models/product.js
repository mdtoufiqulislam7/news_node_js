const mongoose = require('mongoose')

const productmodel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    brand:String,
    price: Number,
    teg: String,
})


module.exports = mongoose.model('product',productmodel)