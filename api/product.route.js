const express = require('express')
const router = express.Router()

// import model 
const productmodel = require('../models/product')
const { default: mongoose } = require('mongoose')
// import medileware 
const auth_check = require("../medileware/auth.medilware")



//productapi
router.get('/product',auth_check,(req,res,next)=>{
    productmodel.find()
    .then(response=>{
        res.status(200).json({
            message:'get all product',
            product:response
        })
    })
})

router.post('/postproduct',(req,res,next)=>{
    const {name,brand,price,teg} = req.body
    const product = new productmodel({
        _id: new mongoose.Types.ObjectId,
        name: name,
        brand:brand,
        price:price,
        teg:teg
    })
    product.save()
    .then(response=>{
        res.status(201).json({
            message:'succefully post done',
            showproduct:response
        })
        
    }).catch(error=>{
        res.status(401).json({
            error:error
        })
    })
})

router.get('/product/:id',(req,res,next)=>{
    productmodel.findById(req.params.id)
    .then(response=>{
        res.status(200).json({
            message:'show your product',
            singleProduct:response
        })
    }).catch(error=>{
        res.status(500).json({
            error:error
        })
    })

})

router.put('/product/:id',(req,res,next)=>{
    const {name,brand,price,teg} = req.body
    productmodel.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            name:name,
            brand:brand,
            price:price,
            teg:teg

        }
    })
    .then(response=>{
        res.status(203).json({
            messege:'update your product',
            showupdateproduct:response
        })
    }).catch(error=>{
        console.log(error)
        res.status(400).json({
            error:error
        })
    })
})

router.delete('/product/:id',(req,res,next)=>{
    productmodel.findByIdAndDelete({_id:req.params.id})
    .then(response=>{
        res.status(200).json({
            message:'product delete succesfully done'
        })
    })
    .catch(error=>{
        res.status(400).json({
            error:error
        })
    })
})






module.exports = router