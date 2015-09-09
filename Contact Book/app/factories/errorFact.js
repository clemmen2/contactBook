(function () {
    'use strict';
    angular.module('cbApp')
        .factory('errorFact', errorFact);
    function errorFact() {
        var errorObj = {};
        var service = {
            getError: getError,
            setError: setError,
            clearError: clearError
        }
        return service;
        function getError() {
            if (jQuery.isEmptyObject(errorObj)) {
                errorObj = {
                    from: 'CBAPP.CONFIG.JS',
                    message: 'This is not the page you are looking for!'
                }
            }
            return errorObj;
        }
        function setError(incError) {
            errorObj = incError;
        }
        function clearError() {
            errorObj = {};
        }
    }
})();