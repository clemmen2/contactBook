(function () {
    angular.module('cbApp')
        .controller('contCtrl', contCtrl);
    contCtrl.$inject = ['logger','$routeParams','$location','api'];
    function contCtrl(logger, $routeParams,$location,api) {
        var vm = this;
        vm.contactId = $routeParams.contId;
        vm.home = home;
        vm.edit = edit;
        api.getContact(vm.contactId).then(onSuccess, onFailure);
        function onSuccess(response) {
            vm.contact = response;
            logger.debug({ from: 'contCtrl.js', message: 'Displaying Contact' });
        }
        function onFailure(response) {
            logger.error({ from: 'contCtrl.js', message: 'Could not get the Contact with id ' + vm.contactId });
        }
        function home() {
            $location.path('/home');
        }
        function edit() {

        }
    }
})();