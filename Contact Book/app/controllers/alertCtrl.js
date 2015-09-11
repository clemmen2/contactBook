(function () {
    angular.module('cbApp')
        .controller('alertCtrl', alertCtrl);
    alertCtrl.$inject = ['$scope','logger'];
    function alertCtrl($scope,logger) {
        var vm = this;
        vm.showAlert = false;
        vm.close = close;
        $scope.$on('alert', show);
        $scope.$on('alertOff', close);
        function close(){
            vm.showAlert = false;
        }
        function show(event, alertObj) {
            vm.alertObj = alertObj;
            vm.showAlert = true;
        }
    }
})();