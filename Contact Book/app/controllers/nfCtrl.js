(function () {
    angular.module('cbApp')
        .controller('nfCtrl', nfCtrl);
    nfCtrl.$inject = ['$location'];
    function nfCtrl($location) {
        var vm = this;
        vm.home = home;
        function home() {
            $location.path('/home');
        }
    }
})();