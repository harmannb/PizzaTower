players = require('./../controller/playersCtrl.js')
module.exports = function(app){
  app.post('/newPlayer',players.newPlayer);
  app.put('/updateScore',players.updateScore);
  app.get('/displayPlayers',players.display);
}
