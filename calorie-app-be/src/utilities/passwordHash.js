
const bcrypt = require("bcrypt");

//this will generate hash from a plain password
module.exports.genPassHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(Number(process.env.SALT_ROUND), function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // return hash to caller.
                if(err){
                    reject(err.message);
                    return;
                }
                resolve(hash);
            });
        });
    })
}

module.exports.checkHash = (plainPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hash, function(err, result) {
            if(err) reject(err);
            resolve(result);
        });
    })
}