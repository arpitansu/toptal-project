//NOTE: this is to generate first user in the app, Just for demo purpose
require('dotenv').config() // requires because it will use SECRET key
require("./src/database/connection");
const {User} = require("./src/database/models")
const {genPassHash} = require("./src/utilities/passwordHash")

const YOUR_NAME = 'Arpit Pandey'
const YOUR_EMAIL = 'arpit3.pandey05@gmail.com'
const YOUR_PASS = '12345'
const IS_ADMIN = false


const generateFirstUser = async (name, email, pass, isAdmin) => {
    const password = await genPassHash(pass);
    const newUser = new User({name, email, password, isAdmin});
    
    newUser.save().then(console.log)
}

generateFirstUser(YOUR_NAME, YOUR_EMAIL, YOUR_PASS, IS_ADMIN)