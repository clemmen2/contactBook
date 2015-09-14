(function () {
    'use strict';
    angular.module('cbApp')
        .constant('regexpConst', {
            NAME: /(?:^$|^[a-zA-Z]+[']?[a-zA-Z]+$)/,
            URL: /(?:^$|^http[s]?:\/\/\S+\.{1}\S+$)/,
            ADDRESS: /(?:^$|^\d+\s\w[\s\S]+$)/,
            CITYSTATE: /(?:^$|^(?:[a-zA-Z']+(?:\.\s\w)?[\s]?)+$)/,
            ZIP: /(?:^$|^\d{5}[-.\s](?:\d{4})$|^\d{5}$|^\d{9}$)/,       /*Some pre-existing contacts do not follow this format. This requires 5 digit zip. Some contacts only have 4 digits.*/
            PHONE: /(?:^$|^[0-9\+x\X\(\)\-.]{10,})/,
            EMAIL: /(?:^$|^\w+[\._\-\+]?\w+[@]{1}\w+[\._\-\+]?\w+[.]{1}\w+$)/
        });
})();