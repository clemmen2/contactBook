(function () {
    angular.module('cbApp')
        .controller('nfCtrl', nfCtrl);
    nfCtrl.$inject = ['$location','logger'];
    function nfCtrl($location, logger) {
        var vm = this;
        vm.home = home;
        function home() {
            $location.path('/home');
        }
    }
})();