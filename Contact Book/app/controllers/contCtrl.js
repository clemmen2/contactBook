(function () {
    angular.module('cbApp')
        .controller('contCtrl', contCtrl);
    contCtrl.$inject = ['$routeParams','$location','$scope','$timeout','api','regexpConst','contactConst','logger'];
    function contCtrl($routeParams, $location, $scope, $timeout, api, regexpConst, contactConst, logger) {
        var vm = this;
        var originalContact = {};
        vm.contactId = $routeParams.contId;
        vm.home = home;
        vm.update = update;
        vm.remove = remove;
        vm.reset = reset;
        vm.regExp = regexpConst;
        api.getContact(vm.contactId).then(onSuccess);
        function onSuccess(response) {
            vm.contact = response;
            originalContact = angular.merge({}, contactConst.CONTACTOBJ, vm.contact);
        }
        function home() {
            $location.path('/home');
        }
        function update() {
            if ($scope.editForm.$valid) {
                for (var prop in vm.contact) {
                    if (vm.contact[prop] === '') {
                        vm.contact[prop] = null;
                    }
                }
                api.updateContact(vm.contact).then(onSucc);
            } else {
                logger.error({ from: 'contCtrl.js', message: 'Not a valid Form!' });
                $timeout(logger.closeAlert, 5000);
            }
            function onSucc(response) {
                originalContact = angular.merge({}, contactConst.CONTACTOBJ, vm.contact);
            }
        }
        function remove(contactId){
            api.deleteContact(contactId).then(onSucc);
            function onSucc(response) {
                $location.path('/home');
            }
        }
        function reset() {
            vm.contact = angular.copy(originalContact);
            $scope.createForm.$setPristine();
            $scope.createForm.$setUntouched();
            $scope.createForm.$setValidity();
            $scope.createForm.$submitted = false;
        }
    }
})();