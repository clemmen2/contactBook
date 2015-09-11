(function () {
    angular.module('cbApp')
        .controller('addCtrl', addCtrl);
    addCtrl.$inject = ['$location','api', 'logger','regexpConst'];
    function addCtrl($location, api, logger, regexpConst) {
        var vm = this;
        vm.create = create;
        vm.home = home;
        vm.regExp = regexpConst;
        function create() {
            logger.debug({ from: 'addCtrl.js', message: 'Creating Contact' });
        }
        function home() {
            $location.path('/home');
        }
    }
})();