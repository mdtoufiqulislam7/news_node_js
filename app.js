const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')

//for image fileuploader
const fileuploader = require('express-fileupload')
app.use(fileuploader({
    useTempFiles:true
}))

// connect database mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:admin@cluster0.qcddwjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connection.on('error',err=>{
    console.log('connected failed')
})
mongoose.connection.on('connected',connected=>{
    console.log('succefully mongodb is connected done')
})


const allowedOrigins = ['http://localhost:3000', 'https://66b29232b3ff5c6cc32ac4e8--lustrous-pastelito-e4dcd8.netlify.app'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // If you need to allow cookies or authorization headers
}));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


//create api || url 
const productapi = require('./api/product.route')
const userrouter = require('./api/user.route')
const prothomalo = require('./api/newsfeed')
app.use('/api',productapi)
app.use('/user',userrouter)
app.use('/bdnews',prothomalo)

//bad url
app.use((req,res,next)=>{
    res.status(400).json({
        message:'bad request|| url not founded'
    })
})



module.exports = app 
