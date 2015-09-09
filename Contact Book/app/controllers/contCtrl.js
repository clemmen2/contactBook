(function () {
    'use strict';
    angular.module('cbApp')
        .controller('contCtrl', contCtrl);
    contCtrl.$inject = ['$log','$routeParams','api'];
    function contCtrl($log, $routeParams,api) {
        var vm = this;
        vm.contactId = $routeParams.contId;
        api.getContact(vm.contactId).then(onSuccess, onFailure);
        function onSuccess(response) {
            vm.contact = response;
            $log.debug('Displaying Contact');
        }
        function onFailure(response) {
            $log.error('Could not get the Contact with id ' + vm.contactId);
        }
    }
})();