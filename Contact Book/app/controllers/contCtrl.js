(function () {
    angular.module('cbApp')
        .controller('contCtrl', contCtrl);
    contCtrl.$inject = ['logger','$routeParams','$location','$scope','$rootScope','$timeout','api','regexpConst','contactConst'];
    function contCtrl(logger, $routeParams, $location, $scope, $rootScope, $timeout, api, regexpConst,contactConst) {
        var vm = this;
        var originalContact = {};
        vm.contactId = $routeParams.contId;
        vm.home = home;
        vm.edit = edit;
        vm.remove = remove;
        vm.reset = reset;
        vm.regExp = regexpConst;
        api.getContact(vm.contactId).then(onSuccess, onFailure);
        function onSuccess(response) {
            vm.contact = response;
            originalContact = angular.merge({}, contactConst.CONTACTOBJ, vm.contact);
            logger.debug({ from: 'contCtrl.js', message: 'Displaying Contact' });
        }
        function onFailure(response) {
            logger.error({ from: 'contCtrl.js', message: 'Could not get the Contact with id ' + vm.contactId });
        }
        function home() {
            $location.path('/home');
        }
        function edit() {
            logger.debug({ from: 'contCtrl.js', message: 'Editing Contact' });
            api.updateContact(vm.contact).then(onSucc);
            function onSucc(response) {
                $timeout(closeAlert, 5000);
            }
        }
        function remove(contactId){
            logger.debug({ from: 'contCtrl.js', message: 'Deleting Contact' });
            api.deleteContact(contactId).then(onSucc);
            function onSucc(response) {
                $timeout(closeAlert, 5000);
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
        function closeAlert() {
            $rootScope.$broadcast('alertOff');
        }
    }
})();