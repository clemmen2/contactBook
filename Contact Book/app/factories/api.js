(function () {
    'use strict';
    angular.module('cbApp')
        .factory('api', api);
    api.$inject = ['$http','logger','$q','$cacheFactory','auth'];
    function api($http, logger, $q, $cacheFactory, auth) {
        var apiCache = $cacheFactory('apiCache');
        var service = {
            addContact: addContact,
            getList: getList,
            getContact: getContact,
            updateContact: updateContact,
            deleteContact: deleteContact
        };
        var req = {
            url: 'http://challenge.acstechnologies.com/api/contact/',
            headers: { 'X-Auth-Token': auth.TOCKEN }
        };
        return service;
        function addContact() {

        }
        function getList() {
            var data = apiCache.get('contactList');
            var tmpReq = jQuery.extend(true, {}, req);
            tmpReq.method = 'GET';
            tmpReq.data = {
                "limit": 1,
                "sort": "first_name" | "last_name" | "address" | "city" | "state" | "zip",
                "desc": true,
                "page": 1
            };
            if (data) {
                logger.debug({ from: 'api.js', message: 'Using Cached Data for Contact List' });
                return $q.resolve(data);
            } else
                return $http(tmpReq).then(onSuccess, onFailure);
            function onSuccess(response) {
                if (response.status == 200 && response.data.total > 0) {
                    logger.debug({ from: 'api.js', message: 'API Status:' + response.status + ' Got the list of contacts' });
                    apiCache.put('contactList', response.data);
                    console.log(apiCache.get('contactList'));
                    return response.data;
                } else {
                    logger.error({ from: 'api.js', message: 'API Status:' + response.status + ' Could not get list of contacts' });
                    logger.debug({ from: 'api.js', message: response });
                    return $q.reject(response.data);
                }

            }
            function onFailure(response) {
                logger.error({ from: 'api.js', message: 'API Status:' + response.status + ' Could not access database' });
                return $q.reject(response.data);
            }
        }
        function getContact(contactId) {
            var tmpReq = jQuery.extend(true, {}, req);
            var data = apiCache.get('contact' + contactId);
            tmpReq.method = 'GET';
            tmpReq.url = tmpReq.url + contactId;
            if (data) {
                logger.debug({ from: 'api.js', message: 'Using Cached Data for Contact ' + contactId });
                return $q.resolve(data);
            }else
                return $http(tmpReq).then(onSuccess, onFailure);
            function onSuccess(response) {
                if (response.status == 200) {
                    logger.debug({ from: 'api.js', message: 'API Status:' + response.status + ' Got the contact with id ' + contactId });
                    apiCache.put('contact' + contactId, response.data);
                    return response.data;
                } else {
                    logger.error({ from: 'api.js', message: 'API Status:' + response.status + ' Could not get the contact with id ' + contactId });
                    return $q.reject(response.data);
                }
            }
            function onFailure(response) {
                logger.error({ from: 'api.js', message: 'API Status:' + response.status + ' Could not access database' });
                return $q.reject(response.data);
            }
        }
        function updateContact() {

        }
        function deleteContact() {

        }
    }
})();