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
            .when('/contact/:contId', {
                templateUrl: 'templ/contact.html',
                controller: 'contCtrl',
                controllerAs: 'vm'
            })
            .when('/error/:fromFile', {
                templateUrl: 'templ/error.html',
                controller: 'errorCtrl',
                controllerAs: 'vm'
            })
            .when('/', {
                redirectTo: '/home'
            })
            .when('/contact', {
                redirectTo: '/home'
            });
        $logProvider.debugEnabled(true);
    }
})();