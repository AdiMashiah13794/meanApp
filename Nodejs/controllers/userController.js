const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 10 ;// increase this if you want more iterations
const randomPassword = 'fakepassword';





var { User } = require('../models/user');

//=>localhost:3000/users/
router.get('/',(req,res)=>{
        User.find((err,docs)=>{
            if(!err){
                res.send(docs);
            }
            else{
                console.log("Error in Retrieving User : "+JSON.stringify(err,undefined,2));
            }
        });
});

router.get('/:id',(req,res)=>{
   if(!ObjectId.isValid(req.params.id))
       return res.status(400).send('No record with given id : ${req.params.id}');

   User.findById(req.params.id,(err,doc)=> {
       if(!err){
           res.send(doc);
       }
       else{
           console.log('Error in retrieving User : '+ JSON.stringify(err,undefined,2));
       }

   });
});

router.post('/',(req,res)=>{

    var user = new User({
        email:req.body.email,
        password:req.body.password,
    });
    bcrypt.hash(user.password,saltRounds,function(err,hash){
       if(!err) {
           user.password=hash;
           user.save((err,doc)=>{
               if(!err){
                   res.send(doc);
               }
               else{
                   console.log('Error in User save : '+JSON.stringify(err,undefined,2));
               }
           });

       }
       else{
           console.log('Error in User password save : '+JSON.stringify(err,undefined,2));

       }
    });

});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var user = {
        email: req.body.email,
        password: req.body.password,

    };
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record with given id : ${req.params.id}');
    }
    User.findByIdAndRemove(req.params.id,(err,doc)=>{
       if(!err){
           res.send(doc);
       }
       else{
           console.log('Error in User Delete : ' + JSON.stringify(err,undefined,2));

       }
    });
});
module.exports =router;


