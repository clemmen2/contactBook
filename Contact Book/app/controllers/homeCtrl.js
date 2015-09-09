(function () {
    'use strict';
    angular.module('cbApp')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['api','logger'];
    function homeCtrl(api,logger) {
        var vm = this;
        vm.error = [];
        api.getList().then(onSuccess, onFailure);
        function onSuccess(response) {
            vm.contacts = response.data;
            logger.debug({ from: 'homeCtrl.js', message: 'Received and displaying list' });
        }
        function onFailure(response) {
            var errMess = { message: 'Something Went Wrong, Please Contact Web Developer' };
            logger.error({ from: 'homeCtrl.js', message: response });
            vm.error.push(errMess);
        }
    }
})();