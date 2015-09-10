(function () {
    'use strict';
    angular.module('cbApp')
        .filter('firstFilt', firstFilt);
    function firstFilt() {
        return filter;
        function filter(contacts, letter) {
            if (!letter) {
                return contacts;
            } else {
                return contacts.filter(function (contact) {
                    return contact.last_name.startsWith(letter);
                });
            }
        }
    }
})();