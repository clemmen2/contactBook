(function () {
    'use strict';
    angular.module('cbApp')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['api','$log'];
    function homeCtrl(api,$log) {
        var vm = this;
        vm.error = [];
        api.getList().then(onSuccess, onFailure);
        function onSuccess(response) {
            vm.contacts = response.data;
            $log.debug('Received and displaying list');
        }
        function onFailure(response) {
            var errMess = { message: 'Something Went Wrong, Please Contact Web Developer' };
            $log.error(response);
            vm.error.push(errMess);
        }
    }
})();