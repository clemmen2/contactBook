(function () {
    'use strict';
    angular.module('cbApp')
        .factory('logger', logger);
    logger.$inject = ['$log'];
    function logger($log) {
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