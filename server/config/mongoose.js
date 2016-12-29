var mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path'),
    model_path = path.join(__dirname,'./../model');

mongoose.connect('mongodb://localhost/PizzaTower');
mongoose.connection.on("connected",function(){
  console.log("Connection Successful");
})
mongoose.connection.on("error",function(err){
  console.log("Error: "+err);
})
fs.readdirSync(model_path).forEach(function(file){
  if(file.indexOf(".js")>=0){
    require(path.join(model_path,file));
  }
})
