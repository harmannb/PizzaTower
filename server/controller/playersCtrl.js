var mongoose = require('mongoose');
var path = require('path');
var player_array_file = require(path.join(__dirname,'./../config/player_array.js'));


var playerModel = mongoose.model('Players');
function PlayerController(){
  this.newPlayer = function(req,res){
    playerModel.findOne({name:req.body.name, score:req.body.score},function(err,playersdata){
      if(err){ console.log("ERROR: "+err); }
      else{
        if(!playersdata){
            playerModel.create({name:req.body.name, score:req.body.score},function(err){
              if(err){console.log("ERROR:"+err);}
              else{ console.log("userAdded"); }
            })
        }

        res.json({status:true});
      }
    })
  }
  this.updateScore = function(req,res){
    playerModel.findOne({name:req.body.name},function(err,playersdata){
      if(err){ console.log("ERROR: "+err); }
      else{
        if(playersdata){
          if(playersdata.length !== 0){
            playerModel.update({name:req.body.name},{$set:{score:req.body.score}},function(err){
              if(err){console.log("ERROR:"+err);}
            })
          }
        }

        res.json({status:true});
      }
    })
  }

  this.display = function(req,res){
        res.json(player_array_file.player_arr);
      }
    }


module.exports = new PlayerController();
