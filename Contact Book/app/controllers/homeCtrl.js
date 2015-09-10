(function () {
    'use strict';
    angular.module('cbApp')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['api','logger','$location'];
    function homeCtrl(api,logger,$location) {
        var vm = this;
        vm.error = [];
        vm.edit = edit;
        vm.filterLast = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
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
        function edit(id) {
            $location.path('/contact/' + id);
        }
    }
})();