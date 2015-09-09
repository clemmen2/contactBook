(function () {
    'use strict';
    angular.module('cbApp')
        .controller('errorCtrl', errorCtrl);
    errorCtrl.$inject = ['logger', 'errorFact'];
    function errorCtrl(logger, errorFact) {
        var vm = this;
        logger.debug({ from: 'errorCtrl.js', message: 'Getting the Error' });
        vm.errorObj = errorFact.getError();
    }
})();