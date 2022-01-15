//this will contain functions related to user
const {upstreamSuccessResponse, upstreamErrorResponse} = require("../../utilities/responseMsg")
const {User} = require("../../database/models")
const {genPassHash} = require("../../utilities/passwordHash")
const { sendEmail, inviteUserEmailTemplate} = require("../../utilities/email")
const {generateAuthToken} = require("../../utilities/JWT")
const {checkHash} = require("../../utilities/passwordHash")

module.exports.getUser = async ({user}) => {
    let userFind = await User.findOne({_id: user._id})
    return upstreamSuccessResponse(userFind)
}

module.exports.login = async ({email, password}) => {
    //check if user exist with same password;
    let user = await User.findOne({email}).lean();
    if(!user){
        return upstreamErrorResponse('User not found');
    }

    //check password hash match;
    const isPassMatch = await checkHash(password, user.password);
    if(!isPassMatch){
        return upstreamErrorResponse('Wrong password')
    }

    //generate jwt token;
    const authToken = generateAuthToken(user);
    user.authToken = authToken;
    return upstreamSuccessResponse({...user})
}

module.exports.createUser = async ({ name, email, password, isAdmin }) => {
     //check if user already registered;
   
     let isUser = await User.findOne({email})
     if(isUser){
         return upstreamErrorResponse("User Already registered")
     }
 
     //generate password hash+salt;
     const passHash = await genPassHash(password);
  
     let newUserObj = {
         name, email, password: passHash, isAdmin
     }
 
    //  const newUser = new User(newUserObj);
     
     try{
         await User.create(newUserObj)
        //send email with pass
        const emailTmp = inviteUserEmailTemplate(email, password);
        try{
            // sendEmail(emailTmp);
            console.log(emailTmp)
        }catch(e){
            //log this err for bug fixing purpose
            console.log(e.message);
        }
        return upstreamSuccessResponse("Welcome to calorie app")
     }catch(error){
        return upstreamErrorResponse(error.message)
     }
 
}

module.exports.getAllUsers = async () => {

    try{
       let users = await User.find()
       return upstreamSuccessResponse(users)
    }catch(error){
       return upstreamErrorResponse(error.message)
    }

}