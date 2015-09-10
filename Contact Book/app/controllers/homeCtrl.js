(function () {
    angular.module('cbApp')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['api','logger','$location'];
    function homeCtrl(api,logger,$location) {
        var vm = this;
        vm.error = [];
        vm.edit = edit;
        vm.add = add;
        vm.filterLast = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        api.getList().then(onSuccess, onFailure);
        function onSuccess(response) {
            vm.contacts = response.data;
            logger.debug({ from: 'homeCtrl.js', message: 'Received and displaying list' });
        }
        function onFailure(response) {
            logger.error({ from: 'homeCtrl.js', message: response });
        }
        function edit(id) {
            $location.path('/contact/' + id);
        }
        function add() {
            $location.path('/add');
        }
    }
})();