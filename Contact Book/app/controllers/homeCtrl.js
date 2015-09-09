(function () {
    'use strict';
    angular.module('cbApp')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['api','$log'];
    function homeCtrl(api) {
        var vm = this;
        vm.error = [];
        api.getList().then(onSuccess, onFailure);
        function onSuccess(response) {
            vm.contacts = response.data;
        }
        function onFailure(response) {
            var errMess = { message: 'Something Went Wrong, Please Contact Web Developer' };
            $log.error(response);
            vm.error.push(errMess);
        }
    }
})();