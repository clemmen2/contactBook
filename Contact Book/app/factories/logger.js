(function () {
    'use strict';
    angular.module('cbApp')
        .factory('logger', logger);
    logger.$inject = ['$log','$location','errorFact'];
    function logger($log,$location,errorFact) {
        var service = {
            debug: debug,
            error: error,
            info: info,
            warning: warning,
            log: log
        };
        return service;
        function debug(content) {
            $log.debug(content.from.toUpperCase() + ':' + content.message);
        }
        function error(content) {
            $log.error(content.from.toUpperCase() + ':' + content.message);
            var errorObj = {
                from: content.from.toUpperCase(),
                message: content.message
            }
            $log.debug('LOGGER.JS:Setting the error');
            errorFact.setError(errorObj);
            $location.path('/error');
        }
        function info(content) {
            $log.info(content.from.toUpperCase() + ':' + content.message);
        }
        function warning(content) {
            $log.warn(content.from.toUpperCase() + ':' + content.message);
        }
        function log(content) {
            $log.log(content.from.toUpperCase() + ':' + content.message);
        }        
    }
})();