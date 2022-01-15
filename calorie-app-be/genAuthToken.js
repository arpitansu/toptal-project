//NOTE: this is only for demo purpose used to create auth token which can be injected into frontend to run the app
require('dotenv').config() // requires because it will use SECRET key
var jwt = require('jsonwebtoken');

const generateAuthToken = function (user) {
    let toCreate ={ email: user.email }
    const token = jwt.sign(toCreate, process.env.SECRET, { expiresIn:  '100d' });
    return token;
}

const YOUR_EMAIL = 'arpit.pandey05@gmail.com'

const token = generateAuthToken({
    email: YOUR_EMAIL
})

console.log({token})