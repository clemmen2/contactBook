(function () {
    angular.module('cbApp')
        .controller('alertCtrl', alertCtrl);
    alertCtrl.$inject = ['$scope'];
    function alertCtrl($scope) {
        var vm = this;
        vm.close = close;
        vm.showAlert = false;
        $scope.$on('alert', show);
        $scope.$on('alertOff', close);
        function close() {
            vm.showAlert = false;
        }
        function show(event, alertObj) {
            vm.alertObj = alertObj;
            vm.showAlert = true;
        }
    }
})();