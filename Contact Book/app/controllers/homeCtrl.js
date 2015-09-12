(function () {
    angular.module('cbApp')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['api','$location'];
    function homeCtrl(api, $location) {
        var vm = this;
        vm.error = [];
        vm.edit = edit;
        vm.add = add;
        vm.filterLast = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        api.getList().then(onSuccess);
        function onSuccess(response) {
            vm.contacts = response.data;
        }
        function edit(id) {
            $location.path('/contact/' + id);
        }
        function add() {
            $location.path('/add');
        }
    }
})();