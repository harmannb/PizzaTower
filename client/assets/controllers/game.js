anguapp.controller('gameCtrl',function($scope,gameFactory){
  $scope.player_array = [];
  $scope.player = gameFactory.player;
  $scope.canvas = document.getElementById('canvasRegn');
  $scope.player_array = gameFactory.existing_player;
  console.log("inside game ctrl "+$scope.canvas );

})
