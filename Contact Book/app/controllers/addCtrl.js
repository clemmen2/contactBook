(function () {
    angular.module('cbApp')
        .controller('addCtrl', addCtrl);
    addCtrl.$inject = ['$location','api', 'logger'];
    function addCtrl($location, api, logger) {
        var vm = this;
        vm.create = create;
        vm.home = home;
        function create() {
            logger.debug({ from: 'addCtrl.js', message: 'Creating Contact' });
        }
        function home() {
            $location.path('/home');
        }
    }
})();