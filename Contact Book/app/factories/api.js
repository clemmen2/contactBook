(function () {
    'use strict';
    angular.module('cbApp')
        .factory('api', api);
    api.$inject = ['$http','$log','$q','auth'];
    function api($http,$log,$q,auth) {
        var service = {
            addContact: addContact,
            getList: getList,
            getContact: getContact,
            updateContact: updateContact,
            deleteContact: deleteContact
        };
        var req = {
            url: 'http://challenge.acstechnologies.com/api/contact/',
            headers: { 'X-Auth-Token': auth.TOCKEN },
        }
        return service;
        function addContact() {

        }
        function getList() {
            req.method = 'GET';
            req.data = {
                "limit": 1,
                "sort": "first_name" | "last_name" | "address" | "city" | "state" | "zip",
                "desc": true,
                "page": 1
            }
            return $http(req).then(onSuccess, onFailure);
            function onSuccess(response) {
                if(response.status == 200 && response.data.total > 0){
                    $log.debug('API Status:' + response.status + ' Got the list of contacts');
                    return response.data;
                }else{
                    $log.error('API Status:' + response.status + ' Could not get list of contacts');
                    return $q.reject(response.data);
                }

            }
            function onFailure(response) {
                $log.error('API Status:' + response.status + ' Could not access database');
                return $q.reject(response.data);
            }
        }
        function getContact(contactId) {
            req.method = 'GET';
            req.url = req.url + contactId;
            return $http(req).then(onSuccess, onFailure);
            function onSuccess(response) {
                if (response.status == 200) {
                    $log.debug('API Status:' + response.status + ' Got the contact with id ' + contactId);
                    $log.debug(response);
                    return response.data;
                } else {
                    $log.error('API Status:' + response.status + ' Could not get the contact with id ' + contactId);
                    return $q.reject(response.data);
                }
            }
            function onFailure(response) {
                $log.error('API Status:' + response.status + ' Could not access database');
                return $q.reject(response.data);
            }
        }
        function updateContact() {

        }
        function deleteContact() {

        }
    }
})();