const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// import model 
const usermodel = require('../models/user')
const { default: mongoose } = require('mongoose')

// user router registation

router.post('/register',(req,res,next)=>{
    bcrypt.hash(req.body.password, 10, (err, hash)=> {
        if(err){
            res.status(400).json({
                error:err
            })
        }
        else{
            const {name,email,phone,type}= req.body
            const user = new usermodel({_id:new mongoose.Types.ObjectId,name,email,password:hash,type,phone})
            user.save()
            .then(response=>{
                res.status(200).json({
                    message:'successfully registation done',
                    user:response
                })
            }).catch(err=>{
                res.status(400).json({
                    error:err
                })
            })
        }
    })



})

router.post('/login',(req,res,next)=>{
    usermodel.find({name:req.body.name})
    .exec()
    .then(user=>{
        if(user.length < 1){
            res.status(500).json({
                message:'user name not found'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=> {
            if(!result){
                res.status(501).json({
                    message:'password incorrect'
                })
            }
            if(result){
                const token = jwt.sign({
                    name:user[0].name,
                    email:user[0].email,
                    phone:user[0].phone,
                    type:user[0].type
                },
                'this is the jwt',
               {
                expiresIn:'24h'
               }
            )
            res.status(200).json({
                message:'login successfully',
                id:user[0]._id,
                name:user[0].name,
                phone:user[0].phone,
                token:token
            })
            }
           

        })
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    })

})




module.exports = router

