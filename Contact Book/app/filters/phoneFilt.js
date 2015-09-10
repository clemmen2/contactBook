(function () {
    'use strict';
    angular.module('cbApp')
        .filter('phoneFilt', phoneFilt);
    phoneFilt.$inject = ['logger']
    function phoneFilt(logger) {
        return filter;
        function filter(phoneNum) {
            var phoneArray = [];
            var newPhone = '';
            var phoneExt = '';
            var tempPhone = '';
            var tenDigit = /(\d{3})[-.)]?(\d{3})[-.]?(\d{4})/;
            var elevenDigit = /(\d)[-.]?(\d{3})[-.)]?(\d{3})[-.]?(\d{4})/;
            var testExt = /[x](\d+)/;
            if (testExt.test(phoneNum)) {
                phoneExt = testExt.exec(phoneNum)[1];
                tempPhone = phoneNum.slice(0, phoneNum.indexOf('x'));
            } else {
                tempPhone = phoneNum;
            }
            var phoneNumLen = tempPhone.replace(/[^0-9]/g, "").length;
            if (phoneNumLen == 10) {
                phoneArray = tenDigit.exec(tempPhone);
                newPhone = phoneArray[1] + '-' + phoneArray[2] + '-' + phoneArray[3];
                if (phoneExt != '')
                    newPhone = newPhone + 'x' + phoneExt;
                return newPhone;
            } else if(phoneNumLen == 11) {
                phoneArray = elevenDigit.exec(tempPhone);
                newPhone = '+' + phoneArray[1] + '-' + phoneArray[2] + '-' + phoneArray[3] + '-' + phoneArray[4];
                if (phoneExt != '')
                    newPhone = newPhone + 'x' + phoneExt;
                return newPhone;
            } else {
                return phoneNum;
            }
        }
    }
})();