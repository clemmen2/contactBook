(function () {
    angular.module('cbApp')
        .controller('contCtrl', contCtrl);
    contCtrl.$inject = ['$routeParams','$location','$scope','api','regexpConst','contactConst'];
    function contCtrl($routeParams, $location, $scope, api, regexpConst,contactConst) {
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
            api.updateContact(vm.contact);
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