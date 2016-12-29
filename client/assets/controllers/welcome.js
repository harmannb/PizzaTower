
anguapp.controller('welcomeCtrl',function($scope,$uibModal,$uibModalInstance,$location,gameFactory,dashboardFactory){

    $scope.startGame = function(){
      $scope.player.socketid = socket.id;
      $scope.player.X = Math.random() * 500;
      $scope.player.Y = 420;
      $scope.player.stack = [];
      $scope.player.score = 0;

      dashboardFactory.newPlayer($scope.player)
      socket.emit('new_player_entered', $scope.player);

      socket.on('existing_players', function(player_arr){
        $uibModalInstance.close();
        gameFactory.playgame(player_arr,$scope.player,function(score){
          $scope.player.score = score;
          dashboardFactory.updateScore($scope.player);
        });
      })
    }


})
