const basicInfo = require('./basicInfo');
const login = require('./login')
module.exports = {
    ...basicInfo,
    paths: {
        ...login
    }
};
