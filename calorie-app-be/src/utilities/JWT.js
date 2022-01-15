var jwt = require('jsonwebtoken');
const { User } = require("../database/models");
const { errorResponse } = require('./responseMsg');

module.exports.generateAuthToken = function (user) {
    let toCreate ={ email: user.email }
    const token = jwt.sign(toCreate, process.env.SECRET, { expiresIn:  '100d' });
    return token;
}

//use it as a middleware on api routes;
module.exports.verifyJWT = async function(req, res, next) {
    // Bearer token
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401);
        res.json(errorResponse('No authorization token in headers found'));
        return;
    }

    const token = authorization.split(" ")[1];
    
    let decode;
    try{
        decode = jwt.verify(token, process.env.SECRET);
    }catch(err){
        res.status(401);
        res.json(errorResponse(err.message));
        return;
    }
    
    //get user from database;
    let user = await User.findOne({email : decode.email});
    if(!user){
        res.status(404);
        res.json(errorResponse("Session error, Please logout and login again"));
        return;
    }

    //attach user to req object for future usage if any;
    req.user = user;

    next();

}