const express = require('express');
const router  = express.Router()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


router.post('/',(req,res,next)=>{// Add user

    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("icrowd");
        dbo.collection("workers").insertOne(req.body, function(err, databaseresponse) {
          if (err) throw err;
          console.log("1 document inserted");
          res.status(200).json({
            message:"New user Added"
        }); 
          db.close();
        });
      });  
})


router.get('/',(req,res,next)=>{// Get all users
    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        var dbo = db.db("icrowd");
        dbo.collection("workers").find().toArray(function(err, result) {
            console.log(result)
            if (err) {
                return console.log("error: " + err);
              }
          res.status(200).json(result);
          db.close();
        });
      }); 
})

router.get('/:user_id',(req,res,next)=>{// Get one user
    
    let user_id = req.params.user_id
    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("icrowd");
        var query = { passport:user_id };
        dbo.collection("workers").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.status(200).json(result);
          db.close();
        });
      }); 
})




router.delete('/',(req,res,next)=>{//delete all users users
    

    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("icrowd");
        dbo.dropCollection("workers",function(err, delOK) {
          if (err) throw err;
          if (delOK){
            res.status(200).json({
                message:"All users Deleted"
            }); 
          }
          db.close();
        });
      });
}) 


router.delete('/:user_id',(req,res,next)=>{//delete Specific User
    let user_id = req.params.user_id
    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("icrowd");
        var myquery = { passport:user_id};
        console.log(myquery)
        dbo.collection("workers").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          res.status(200).json({
            message:"User Deleted"
        }); 
          db.close();
        });
      }); 
   
})


router.patch('/:user_id',(req,res,next)=>{//Updating Specific users
    let user_id = req.params.user_id
    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("icrowd");
        var myquery = { passport:user_id};
        var newvalues = { $set: {name: req.body.name,} };
        console.log(newvalues)
        dbo.collection("workers").updateOne(myquery, newvalues, function(err, databaseresponse) {
          if (err) throw err;
          res.status(200).json({
            message:"Update one users"
        }); 
          db.close();
        });
      });


})


router.patch('/password/:user_id',(req,res,next)=>{//Updating Specific users
    let user_id = req.params.user_id
    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("icrowd");
        var myquery = { passport:user_id};
        var newvalues = { $set: {password: req.body.password,} };
        console.log(newvalues)
        dbo.collection("workers").updateOne(myquery, newvalues, function(err, databaseresponse) {
          if (err) throw err;
            console.log(databaseresponse)
            res.status(200).json({
                message:"Done password Updating"
            }); 
          db.close();
        });
      });

})

router.patch('/other/:user_id',(req,res,next)=>{//Updating Specific users
    let user_id = req.params.user_id
    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("icrowd");
        var myquery = { passport:user_id};
        var newvalues = { $set: {phone: req.body.phone,address:req.body.address} };
        console.log(newvalues)
        dbo.collection("workers").updateOne(myquery, newvalues, function(err, databaseresponse) {
          if (err) throw err;
            console.log(databaseresponse)
            res.status(200).json({
                message:"Done mobile and address Updating"
            });
          db.close();
        });
      });
 
})

module.exports = router