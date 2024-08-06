
const express = require('express')
const router = express.Router()
const newsmodel = require('../models/news')
const authroute = require("../medileware/auth.medilware")
const { default: mongoose } = require('mongoose')

const cloudinary = require('cloudinary').v2;
// Configuration
cloudinary.config({ 
    cloud_name: 'dshkbza19', 
    api_key: '587566651786429', 
    api_secret: 'Nd7M3bl2EgFqfJSm1RRE9MZxNq0' // Click 'View Credentials' below to copy your API secret
});

router.post('/postnews',authroute,(req,res,next)=>{

    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        console.log(result)
        const {title,discription,teg} = req.body;
        const newsmodell = new newsmodel({
            _id:new mongoose.Types.ObjectId,
            title:title,
            discription:discription,
            teg:teg,
            url:result.url
            

        })
        newsmodell.save()
        .then(response=>{
            return res.status(200).json({
                message:"successfullly post data",
                data:response
            })
            
        }).catch(err=>{
            res.status(400).json({
                error:err
            })
        })
    })
    


})

router.get('/getnews',authroute,(req,res,next)=>{
    newsmodel.find()
    .then(response=>{
        res.status(200).json({
            data:response
        })
    })

})


module.exports = router

