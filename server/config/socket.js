module.exports = function(app, server){
var io = require('socket.io').listen(server)
var player_arr = [];

io.sockets.on('connection', function(socket){

  socket.on('new_player_entered', function(playerdata){
    player_arr.push(playerdata);
  //  socket.emit('existing_players', player_arr);
  	// socket.broadcast.emit('new_player_entered', playerdata);
  	io.emit('existing_players', player_arr);
  })
  socket.on('key_pressed',function(chef){
    for(var i = 0; i < player_arr.length; i++){
      if(player_arr[i].socketid === chef.socketid){
        player_arr[i].X = chef.x;
        player_arr[i].stack = chef.stack;
        player_arr[i].score = chef.score;
      }
    }
    socket.broadcast.emit('key_pressed',chef);
  })
  socket.on('score_increased',function(chef){
    for(var i = 0; i < player_arr.length; i++){
      if(player_arr[i].socketid === chef.socketid){
        player_arr[i].stack = chef.stack;
        player_arr[i].score = chef.score;
      }
    }
    socket.broadcast.emit('score_increased',chef);
  })
  socket.on('disconecting',function(chef){
    for(var i = 0; i < player_arr.length; i++){
      if(player_arr[i].socketid){
        if(player_arr[i].socketid=== chef.socketid){
        player_arr.splice(i,1);
        socket.broadcast.emit('someone_disconected',i);
        socket.emit('you_disconected',i);
        break;
      }
    }
    }
  });


	});

}
