(function () {
    angular.module('cbApp')
        .controller('contCtrl', contCtrl);
    contCtrl.$inject = ['logger','$routeParams','api'];
    function contCtrl(logger, $routeParams,api) {
        var vm = this;
        vm.contactId = $routeParams.contId;
        api.getContact(vm.contactId).then(onSuccess, onFailure);
        function onSuccess(response) {
            vm.contact = response;
            logger.debug({ from: 'contCtrl.js', message: 'Displaying Contact' });
        }
        function onFailure(response) {
            logger.error({ from: 'contCtrl.js', message: 'Could not get the Contact with id ' + vm.contactId });
        }
    }
})();