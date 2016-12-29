anguapp.factory('dashboardFactory',function($http){
  factory = {};
  factory.newPlayer = function(usertoadd){
    $http.post('/newPlayer',usertoadd).then(function(returnedData){
      })
  }
  factory.updateScore = function(data){
    factory.currentScore = data.score;
    console.log(factory.currentScore);
    $http.put('/updateScore',data).then(function(returnedData){
      })
  }
  factory.display = function(callback){
    $http.get('/displayPlayers').then(function(returnedData){
      callback(returnedData.data);
    })
  }

  return factory;
})
