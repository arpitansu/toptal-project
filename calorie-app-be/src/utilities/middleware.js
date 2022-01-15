const { errorResponse } = require("./responseMsg");


module.exports.isAdmin = (req, res, next) => {
    if(!req.user.isAdmin) {
        res.status(401);
        res.json(errorResponse("only admins can access this route"));
        return;
    }
    next()
}