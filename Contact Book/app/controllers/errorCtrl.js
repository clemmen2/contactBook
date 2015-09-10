(function () {
    angular.module('cbApp')
        .controller('errorCtrl', errorCtrl);
    errorCtrl.$inject = ['$location','logger', 'errorFact'];
    function errorCtrl($location, logger, errorFact) {
        var vm = this;
        vm.home = home;
        logger.debug({ from: 'errorCtrl.js', message: 'Getting the Error' });
        vm.errorObj = errorFact.getError();
        logger.debug({ from: 'errorCtrl.js', message: 'Clearing the Error' });
        errorFact.clearError();
        function home() {
            $location.path('/home');
        }
    }
})();