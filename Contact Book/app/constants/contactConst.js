(function () {
    'use strict';
    angular.module('cbApp')
        .constant('contactConst', { CONTACTOBJ: {
            first_name: '',
            last_name: '',
            company_name: '',
            url: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            email: '',
            phone: '',
            work_phone: ''
        }
    });
})();