(function () {
    angular.module('cbApp')
        .controller('addCtrl', addCtrl);
    addCtrl.$inject = ['$location','$scope','$timeout','api','logger','regexpConst','contactConst'];
    function addCtrl($location, $scope, $timeout, api, logger, regexpConst, contactConst) {
        var vm = this;
        clearContact = contactConst.CONTACTOBJ;     /*using HTML5 reset was creating bugs have to hard reset form*/
        vm.create = create;
        vm.clear = clear;
        vm.home = home;
        vm.regExp = regexpConst;
        function create() {
            if ($scope.addForm.$valid) {            /*Unifies all contacts. If user puts a value and erases it reads '' not null.*/
                for (var prop in vm.contact) {
                    if (vm.contact[prop] === '') {
                        vm.contact[prop] = null;
                    }
                }
                api.addContact(vm.contact).then(onSuccess);
            } else {
                logger.error({ from: 'addCtrl.js', message: 'Not a valid Form' });  /*On smartphones, if user is scrolled at bottom they will not know there is an error if I didn't include this.*/
                $timeout(logger.closeAlert, 5000);
            }
            function onSuccess(response) {
                vm.clear();
            }
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