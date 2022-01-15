var express = require('express');
var router = express.Router();
const { verifyJWT } = require('../../utilities/JWT');
const { isAdmin } = require('../../utilities/middleware');
const {login,register, inviteFriend, getUserData, allUsers, getUserFoodById} = require("./controller");

router.get("/", verifyJWT, getUserData)
router.post('/login', login);
router.post('/register', register);
router.post('/invite-friend', verifyJWT, inviteFriend);
//admin routes
router.get('/all', verifyJWT, isAdmin, allUsers);
router.get('/user-food', verifyJWT, isAdmin, getUserFoodById);

module.exports = router;

