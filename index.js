var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose");
const { system } = require("nodemon/lib/config");
const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/mydb' , {
   useNewUrlParser:true,
   useUnifiedTopology:true

})
var db = mongoose.connection;

db.on('error' , function(){
   console.log("Error in database connection")
})
db.once('open' , function () {
   console.log("conneceted to database")
  })

app.post("/sign_up" , function(req,res){
   var name = req.body.name;
   var email = req.body.email;
   var phno = req.body.phno;
   var password = req.body.password;

 var data = {
   "name" : name,
   "email" : email , 
   "phno" : phno,
   "password" : password
 }

 db.collection('users').insertOne(data , function(err , collection){
   if(err){
      throw err;
   }
   console.log("Record inserted")
 });

 return res.redirect('signup_success.html')
})

app.get("/" , function (req,res) { 
  res.set({
   "Allow-access-Allow-origin":'*'
 })
return res.redirect("index.html")
})


 app.listen(3000 , function(){
   console.log("Started")
 })