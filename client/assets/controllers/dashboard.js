anguapp.controller('dashboardCtrl',function($scope,dashboardFactory, gameFactory){
  $scope.players = [];
  gameFactory.scoperef = $scope;
  $scope.display = function(){
    dashboardFactory.display(function(data){
      $scope.players = data;
    })
  }
  $scope.display();
})
