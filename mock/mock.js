let Mock = require('mockjs');

var Random = Mock.Random;

module.exports = function () {
    var data = {};
    data.user = {
        'name': 'lena',
        'intro': 'haha'
    };
    return data;
};