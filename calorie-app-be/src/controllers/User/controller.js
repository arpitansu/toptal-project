//this is a user controller
const {UserValidation, UserLoginValidation, InviteFriendValidation, UserIdValidation} = require('./validation')
const {errorResponse, successResponse, somethingWentWrongResponse} = require("../../utilities/responseMsg")
const {createUser, login: userLogin, getUser, getAllUsers} = require("./upstream")
const {genOTP} = require("../../utilities/otpgen")
const { getFood } = require('../Food/upstream')

module.exports.getUserData = async (req, res) => {
    //this will send all th euser data as soon as the react app starts
    const {user} = req
    try{
        const response = await getUser({ user })
        if(response.error){
            res.status(400);
            res.json(errorResponse(response.payload))
            return;
        }
    
        res.json(successResponse(response.payload))
    }catch(e){
        res.status(500);
        res.json(errorResponse(e.message))
    }
}

module.exports.login = async (req, res) => {

    const validation = UserLoginValidation.validate(req.body)
    if(validation.error){
        res.status(400)
        res.json(errorResponse(validation))
        return;
    }


    const {email, password} = req.body;
    try{
        const response = await userLogin({ email, password })
        if(response.error){
            res.status(400);
            res.json(errorResponse(response.payload))
            return;
        }
    
        res.json(successResponse(response.payload))
    }catch(e){
        res.status(500);
        res.json(errorResponse(e.message))
    }
   
}

module.exports.register = async (req, res) => {
    
    const validation = UserValidation.validate(req.body)
    if(validation.error){
        res.status(400)
        res.json(errorResponse(validation))
        return;
    }

    const { name, email, password, isAdmin } = req.body;

    try{
        const response = await createUser({ name, email, password, isAdmin })
        if(response.error){
            res.status(400);
            res.json(errorResponse(response.payload))
            return;
        }
    
        res.json(successResponse(response.payload))
    }catch(e){
        res.status(500);
        res.json(errorResponse(e.message))
    }
   
}

//invite a friend feature
module.exports.inviteFriend = async (req, res) => {
    const validation = InviteFriendValidation.validate(req.body)
    if(validation.error){
        res.status(400)
        res.json(errorResponse(validation))
        return;
    }

    const { name, email } = req.body;
    const password = genOTP(5)
    const isAdmin = false

    try{
        const response = await createUser({ name, email, password, isAdmin })
        if(response.error){
            res.status(400);
            res.json(errorResponse(response.payload))
            return;
        }
    
        res.json(successResponse(response.payload))
    }catch(e){
        res.status(500);
        res.json(errorResponse(e.message))
    }
}


//admin controllers below

module.exports.allUsers = async (req, res) => {
    //this will return all users present
    try{
        let response = await getAllUsers()
        if(response.error){
            res.status(400);
            res.json(errorResponse(response.payload))
            return;
        }
        res.json(successResponse(response.payload))
    }catch(e){
        res.status(500);
        res.json(errorResponse(e.message))
    }
}

module.exports.getUserFoodById = async (req, res) => {

    const validation = UserIdValidation.validate(req.query)
    if(validation.error){
        res.status(400)
        res.json(errorResponse(validation))
        return;
    }

    const id = req.query.userId
    try{
        const response = await getFood(id)
        if(response.error){
            res.status(400);
            res.json(errorResponse(response.payload))
            return;
        }
    
        res.json(successResponse(response.payload))
    }catch(e){
        res.status(500);
        res.json(errorResponse(e.message))
    }
}