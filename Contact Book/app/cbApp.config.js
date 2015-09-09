(function () {
    'use strict';
    angular.module('cbApp')
        .config(config);
    config.$inject = ['$routeProvider','$logProvider'];
    function config($routeProvider, $logProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'templ/home.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/', {
                redirectTo: '/home'
            });
        $logProvider.debugEnabled(true);
    }
})();