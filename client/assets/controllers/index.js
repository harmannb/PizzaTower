

anguapp.controller('indexCtrl',function($scope,$uibModal){

    $uibModal.open({
      templateUrl : 'partials/welcome.html',
      controller : 'welcomeCtrl',
      windowClass: 'app-modal-window'
    })

})
