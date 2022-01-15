
//this is global route file this routes to specific controller route file on specific URI;
//for e.g any request at /user will be forwarded to user controller and route file;

var express = require('express');
var router = express.Router();

const userRoute = require("../src/controllers/User/route");
const foodRoute = require("../src/controllers/Food/route");

router.use('/user', userRoute);
router.use('/food', foodRoute);

module.exports = router;