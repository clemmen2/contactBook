(function () {
    'use strict';
    angular.module('cbApp')
        .constant('contactConst', { CONTACTOBJ: {
            first_name: null,
            last_name: null,
            company_name: null,
            url: null,
            address: null,
            city: null,
            state: null,
            zip: null,
            email: null,
            phone: null,
            work_phone: null
        }
    });
})();