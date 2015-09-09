(function () {
    'use strict';
    angular.module('cbApp')
        .config(config);
    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'templ/home.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/', {
                redirectTo: '/home'
            });
    }
})();