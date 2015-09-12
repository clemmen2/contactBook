(function () {
    'use strict';
    angular.module('cbApp')
        .factory('api', api);
    api.$inject = ['$http','logger','$q','$cacheFactory','$timeout','authConst'];
    function api($http, logger, $q, $cacheFactory, $timeout, authConst) {
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
            headers: { 'X-Auth-Token': authConst.TOCKEN }
        };
        return service;
        function addContact(contact) {
            var tmpReq = angular.copy(req);
            tmpReq.method = 'POST';
            tmpReq.data = contact;
            logger.info({ from: 'api.js', message: 'Creating Contact. Please Wait...' });
            return $http(tmpReq).then(onSuccess, onFailure);
            function onSuccess(response) {
                logger.success({ from: 'api.js', message: 'Successfully added ' + response.data.new_contact.first_name });
                logger.debug({ from: 'api.js', message: 'with id ' + response.data.new_contact.id });
                apiCache.remove('contactList');
                $timeout(logger.closeAlert, 5000);
                return response.data;
            }
            function onFailure(response) {
                logger.error({ from: 'api.js', message: 'Could not add new contact' });
                logger.debug({ from: 'api.js', message: 'API Status:' + response.status });
                return $q.reject(response.data);
            }
        }
        function getList() {
            var data = apiCache.get('contactList');
            var tmpReq = angular.copy(req);
            tmpReq.method = 'GET';
            tmpReq.data = {
                "limit": 1,
                "sort": "first_name" | "last_name" | "address" | "city" | "state" | "zip",
                "desc": true,
                "page": 1
            };
            logger.info({ from: 'api.js', message: 'Loading Contacts. Please Wait...' });
            if (data) {
                logger.debug({ from: 'api.js', message: 'Using Cached Data for Contact List' });
                logger.closeAlert();
                return $q.resolve(data);
            } else
                return $http(tmpReq).then(onSuccess, onFailure);
            function onSuccess(response) {
                if (response.status == 200 && response.data.total > 0) {
                    logger.debug({ from: 'api.js', message: 'API Status:' + response.status + ' Got the list of contacts' });
                    apiCache.put('contactList', response.data);
                    logger.closeAlert();
                    return response.data;
                } else {
                    logger.error({ from: 'api.js', message: 'Could not get list of contacts' });
                    logger.debug({ from: 'api.js', message: 'API Status:' + response.status });
                    return $q.reject(response.data);
                }

            }
            function onFailure(response) {
                logger.error({ from: 'api.js', message: 'Could not access database' });
                logger.debug({ from: 'api.js', message: 'API Status:' + response.status });
                $timeout(logger.closeAlert, 5000);
                return $q.reject(response.data);
            }
        }
        function getContact(contactId) {
            var tmpReq = angular.copy(req);
            var data = apiCache.get('contact' + contactId);
            tmpReq.method = 'GET';
            tmpReq.url = tmpReq.url + contactId;
            logger.info({ from: 'api.js', message: 'Getting the Contact. Please Wait...' });
            if (data) {
                logger.debug({ from: 'api.js', message: 'Using Cached Data for Contact ' + contactId });
                logger.closeAlert();
                return $q.resolve(data);
            }else
                return $http(tmpReq).then(onSuccess, onFailure);
            function onSuccess(response) {
                if (response.status == 200) {
                    logger.debug({ from: 'api.js', message: 'API Status:' + response.status + ' Got the contact with id ' + contactId });
                    apiCache.put('contact' + contactId, response.data);
                    logger.closeAlert();
                    return response.data;
                } else {
                    logger.error({ from: 'api.js', message: 'Could not get the contact' });
                    logger.debug({ from: 'api.js', message: 'with id ' + contactId });
                    logger.debug({ from: 'api.js', message: 'API Status:' + response.status });
                    return $q.reject(response.data);
                }
            }
            function onFailure(response) {
                logger.error({ from: 'api.js', message: 'Could not get the contact' });
                logger.debug({ from: 'api.js', message: 'with id ' + contactId });
                logger.debug({ from: 'api.js', message: 'API Status:' + response.status });
                return $q.reject(response.data);
            }
        }
        function updateContact(contact) {
            var tmpReq = angular.copy(req);
            tmpReq.method = 'PUT';
            tmpReq.url = tmpReq.url + contact.id;
            tmpReq.data = contact;
            logger.info({ from: 'api.js', message: 'Updating Contact. Please Wait...' });
            return $http(tmpReq).then(onSuccess, onFailure);
            function onSuccess(response) {
                logger.success({ from: 'api.js', message: 'Successfully updated contact ' + contact.first_name });
                apiCache.remove('contactList');
                $timeout(logger.closeAlert, 5000);
                return response.data;
            }
            function onFailure(response) {
                logger.error({ from: 'api.js', message: 'Could not update contact ' + contact.first_name });
                logger.debug({ from: 'api.js', message: 'with id ' + contact.id });
                return $q.reject(response.data);
            }
        }
        function deleteContact(contactId) {
            var tmpReq = angular.copy(req);
            tmpReq.method = 'DELETE';
            tmpReq.url = tmpReq.url + contactId;
            logger.info({ from: 'api.js', message: 'Removing Contact. Please Wait...' });
            return $http(tmpReq).then(onSuccess, onFailure);
            function onSuccess(response) {
                logger.warning({ from: 'api.js', message: 'Successfully removed contact' });
                logger.debug({ from: 'api.js', message: 'with id ' + contactId });
                apiCache.remove('contactList');
                $timeout(logger.closeAlert, 5000);
                return response.data;
            }
            function onFailure(response) {
                logger.error({ from: 'api.js', message: 'Could not remove contact' });
                logger.debug({ from: 'api.js', message: 'API Status:' + response.status });
                return $q.reject(response.data);
            }
        }
    }
})();