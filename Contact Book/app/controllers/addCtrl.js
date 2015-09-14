(function () {
    angular.module('cbApp')
        .controller('addCtrl', addCtrl);
    addCtrl.$inject = ['$location','$scope','$timeout','api','logger','regexpConst','contactConst'];
    function addCtrl($location, $scope, $timeout, api, logger, regexpConst, contactConst) {
        var vm = this;
        clearContact = contactConst.CONTACTOBJ;     /*using HTML5 reset was creating bugs have to hard reset form*/
        vm.create = create;
        vm.clear = clear;
        vm.home = home;
        vm.regExp = regexpConst;
        resetFixed();
        $scope.$watchCollection('vm.contact', contChange);
        function create() {
            resetFixed();
            if ($scope.addForm.$valid) {            /*Unifies all contacts. If user puts a value and erases it reads '' not null.*/
                for (var prop in vm.contact) {
                    if (vm.contact[prop] === '') {
                        vm.contact[prop] = null;
                    }
                }
                api.addContact(vm.contact).then(onSuccess);
            } else {
                logger.error({ from: 'addCtrl.js', message: 'Not a valid Form' });  /*On smartphones, if user is scrolled at bottom they will not know there is an error if I didn't include this.*/
                $timeout(logger.closeAlert, 5000);
            }
            function onSuccess(response) {
                vm.clear();
            }
        }
        function home() {
            $location.path('/home');
        }
        function clear() {
            vm.contact = angular.copy(clearContact);
            $scope.addForm.$setPristine();
            $scope.addForm.$setUntouched();
            $scope.addForm.$setValidity();
            $scope.addForm.$submitted = false;
        }
        function contChange(newContact) {
            var count = 0;
            if ($scope.addForm.firstName.$valid)
                vm.fixed.firstName = true;
            if ($scope.addForm.lastName.$valid)
                vm.fixed.lastName = true;
            if ($scope.addForm.url.$valid)
                vm.fixed.url = true;
            if ($scope.addForm.address.$valid)
                vm.fixed.address = true;
            if ($scope.addForm.city.$valid)
                vm.fixed.city = true;
            if ($scope.addForm.state.$valid)
                vm.fixed.state = true;
            if ($scope.addForm.zip.$valid)
                vm.fixed.zip = true;
            if ($scope.addForm.email.$valid)
                vm.fixed.email = true;
            if ($scope.addForm.phone.$valid)
                vm.fixed.phone = true;
            if ($scope.addForm.work.$valid)
                vm.fixed.work = true;
            for (var prop in vm.fixed) {
                if (vm.fixed[prop] == true)
                    count += 1;
            }
            if (count == 10)
                vm.fixedForm = true;
        }
        function resetFixed() {
            vm.fixed = {
                firstName: false,
                lastName: false,
                url: false,
                address: false,
                city: false,
                state: false,
                zip: false,
                email: false,
                phone: false,
                work: false
            }
            vm.fixedForm = false;
        }
    }
})();