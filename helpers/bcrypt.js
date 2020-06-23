const bcrypt = require('bcrypt');
const saltRounds = 8;
const hashPassword = function (password) {  
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash
}
const checkPassword = function (password, hash) {  
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashPassword,
    checkPassword
}
