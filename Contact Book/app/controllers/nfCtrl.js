(function () {
    angular.module('cbApp')
        .controller('nfCtrl', nfCtrl);
    nfCtrl.$inject = ['$location'];
    function nfCtrl($location) {
        var vm = this;
        init();
        function init() {
            vm.home = home;
            function home() {
                $location.path('/home');
            }
        }
    }
})();