var mongoose = require('mongoose');
var PlayersSchema = new mongoose.Schema({
  name: {type:String, required:[true,"Name cannot be blank"]},
  score: Number
});
mongoose.model('Players',PlayersSchema);
