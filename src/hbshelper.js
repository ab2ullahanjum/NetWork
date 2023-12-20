
const hbs = require('hbs');

function registerHelpers() {
    hbs.registerHelper('isEqual', function (a, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
    });
    hbs.registerHelper('countActiveUsers', function (users) {
        const filteredUsers = users.filter(user => user.pkg !== 'none' && user.pkg !== 'expired');
        return filteredUsers.length;
    });
    hbs.registerHelper('countinActiveUsers', function (users) {
        const filteredUsers = users.filter(user => user.pkg === 'none');
        return filteredUsers.length;
    });
    hbs.registerHelper('countexpiredUsers', function (users) {
        const filteredUsers = users.filter(user => user.pkg === 'expired');
        return filteredUsers.length;
    });
}

module.exports = registerHelpers;
