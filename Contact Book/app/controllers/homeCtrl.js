(function () {
    'use strict';
    angular.module('cbApp')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$http'];
    function homeCtrl($http) {
        var req = {
            method: 'GET',
            url: 'http://challenge.acstechnologies.com/api/contact/',
            headers: { 'X-Auth-Token': 'zXXvHTIvXt04vSJWPUWxMC5ROBtVUB34ZRuIRXeM' },
            data:{
                "limit": 1,
                "sort": "first_name"|"last_name"|"address"|"city"|"state"|"zip",
                "desc": true,
                "page": 1
            }
        }
        $http(req).then(onSuccess, onFailure);
        function onSuccess(response) {
            console.log(response.data.data);
        }
        function onFailure(response) {
            console.log(response.status);
        }
    }
})();