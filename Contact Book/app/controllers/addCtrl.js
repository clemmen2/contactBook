(function () {
    angular.module('cbApp')
        .controller('addCtrl', addCtrl);
    addCtrl.$inject = ['$location','$scope','$rootScope','api', 'logger','regexpConst','contactConst'];
    function addCtrl($location, $scope, $rootScope, api, logger, regexpConst, contactConst) {
        var vm = this;
        clearContact = contactConst.CONTACTOBJ; /*using HTML5 reset was creating bugs have to hard reset form*/
        vm.create = create;
        vm.clear = clear;
        vm.home = home;
        vm.regExp = regexpConst;
        function create() {
            if ($scope.addForm.$valid) {
                for (var prop in vm.contact) {
                    if (vm.contact[prop] === '') {
                        vm.contact[prop] = null;
                    }
                }
                console.log(vm.contact);
                logger.debug({ from: 'addCtrl.js', message: 'Creating Contact' });
                api.addContact(vm.contact).then(onSuccess);
            } else {
                logger.debug({ from: 'addCtrl.js', message: 'Not a valid Form' });
            }
            function onSuccess(response) {
                vm.clear();
            }
        }
        function home() {
            $rootScope.$broadcast('alertOff');
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