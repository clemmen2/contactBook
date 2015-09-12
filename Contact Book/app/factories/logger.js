(function () {
    'use strict';
    angular.module('cbApp')
        .factory('logger', logger);
    logger.$inject = ['$log','$location','$rootScope'];
    function logger($log,$location,$rootScope) {
        var service = {
            debug: debug,
            error: error,
            info: info,
            warning: warning,
            success: success,
            log: log,
            closeAlert: closeAlert
        };
        return service;
        function debug(content) {
            $log.debug(content.from.toUpperCase() + ':' + content.message);
        }
        function error(content) {
            sendAlert(content.from, content.message, 'alert-danger');
        }
        function info(content) {
            sendAlert(content.from, content.message, 'alert-info');
        }
        function warning(content) {
            sendAlert(content.from, content.message, 'alert-warning');
        }
        function log(content) {
            $log.log(content.from.toUpperCase() + ':' + content.message);
        }
        function success(content) {
            sendAlert(content.from, content.message, 'alert-success');
        }
        function sendAlert(from, mess, type) {
            var alertObj = {
                message: mess,
                alertType: type
            };
            $log.debug(type + ':' + from.toUpperCase() + ':' + mess);
            $rootScope.$broadcast('alert', alertObj);
        }
        function closeAlert() {
            $rootScope.$broadcast('alertOff');
        }
    }
})();