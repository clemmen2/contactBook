(function () {
    angular.module('cbApp')
        .controller('addCtrl', addCtrl);
    addCtrl.$inject = ['$location','$scope','api', 'logger','regexpConst','contactConst'];
    function addCtrl($location, $scope, api, logger, regexpConst, contactConst) {
        var vm = this;
        clearContact = contactConst.CONTACTOBJ; /*using HTML5 reset was creating bugs have to hard reset form*/
        vm.create = create;
        vm.clear = clear;
        vm.home = home;
        vm.regExp = regexpConst;
        function create() {
            logger.debug({ from: 'addCtrl.js', message: 'Creating Contact' });
        }
        function home() {
            $location.path('/home');
        }
        function clear() {
            vm.contact = angular.copy(clearContact);
            $scope.addForm.$setPristine();
            $scope.addForm.$setUntouched();
            $scope.addForm.$setValidity();
            $scope.addForm.$submitted = false;
        }
    }
})();