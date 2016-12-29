anguapp.controller('dashboardCtrl',function($scope,dashboardFactory){
  $scope.players = [];
  $scope.display = function(){
    dashboardFactory.display(function(data){
      $scope.players = data;
    })
  }
  $scope.display();
})
