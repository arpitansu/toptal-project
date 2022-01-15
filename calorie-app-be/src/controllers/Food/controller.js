const {errorResponse, successResponse, somethingWentWrongResponse} = require("../../utilities/responseMsg")
const {FoodAddValidation, FoodIdValidation, FoodProductValidation, ProductIdValidation, FoodSchemaValidation} = require("./validation")
const {createFood, getFood: getUserFood, updateFoodProduct: updateFoodProductUpstream, 
    deleteFoodProduct: deleteFoodProductUpstream, deleteFood: deleteFoodUpstream,  updateFood: updateFoodUpstream,
    usersAvgCaloriesReport,
    lastSevenDaysReport} = require("./upstream")

module.exports.addFood = async (req, res) => {
    const validation = FoodAddValidation.validate(req.body)
    if(validation.error){
        res.status(400)
        res.json(errorResponse(validation))
        return;
    }

    const { name, dateOfConsumption, timeOfConsumption, calorie } = req.body
    try{
        const response = await createFood({ name, dateOfConsumption, timeOfConsumption, calorie, user: req.user._id})
        if(response.error){
            res.status(400);
            res.json(errorResponse(response.payload))
            return;
        }
        console.log({response})
        res.json(successResponse(response.payload))
    }catch(e){
        res.status(500);
        res.json(errorResponse(e.message))
    }
   

}

module.exports.getFood = async (req, res) => {
    const {user} = req;
    let id = user._id
    try{
        const response = await getUserFood(id)
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

module.exports.addFoodAdmin = async (req, res) => {
    const validation = FoodAddValidation.validate(req.body)
    if(validation.error){
        res.status(400)
        res.json(errorResponse(validation))
        return;
    }

    const { name, dateOfConsumption, timeOfConsumption, calorie } = req.body
    try{
        const response = await createFood({ name, dateOfConsumption, timeOfConsumption, calorie, user: req.body.userId})
        if(response.error){
            res.status(400);
            res.json(errorResponse(response.payload))
            return;
        }
        console.log({response})
        res.json(successResponse(response.payload))
    }catch(e){
        res.status(500);
        res.json(errorResponse(e.message))
    }
   

}

module.exports.updateFood = async (req, res) => {
    const validation = FoodIdValidation.validate(req.params)
    if(validation.error){
        res.status(400)
        res.json(errorResponse(validation))
        return;
    }

    const validation2 = FoodSchemaValidation.validate(req.body)
    if(validation2.error){
        res.status(400)
        res.json(errorResponse(validation2))
        return;
    }

    const {id} = req.params
    const foodData = req.body
    try{
        const response = await updateFoodUpstream(id, foodData)
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

module.exports.updateFoodProduct = async (req, res) => {

    const validation = FoodIdValidation.validate(req.params)
    if(validation.error){
        res.status(400)
        res.json(errorResponse(validation))
        return;
    }

    const validation2 = FoodProductValidation.validate(req.body)
    if(validation2.error){
        res.status(400)
        res.json(errorResponse(validation2))
        return;
    }

    const {id} = req.params
    const product = req.body //_id, name, time, calorie

    try{
        const response = await updateFoodProductUpstream(id, product)
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

module.exports.deleteFood = async (req, res) => {
    const validation = FoodIdValidation.validate(req.params)
    if(validation.error){
        res.status(400)
        res.json(errorResponse(validation))
        return;
    }

    const {id} = req.params

    try{
        const response = await deleteFoodUpstream(id)
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

module.exports.deleteFoodProduct = async (req, res) => {
    const validation = ProductIdValidation.validate(req.params)
    if(validation.error){
        res.status(400)
        res.json(errorResponse(validation))
        return;
    }

    const {id} = req.params
    const {productId} = req.params //_id, name, time, calorie

    try{
        const response = await deleteFoodProductUpstream(id, productId)
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

module.exports.report = async (req, res) => {
    //2 reports
    //this last 7days vs 7days before total entries
    //avg calories added per user in last 7 days  = all calories added in 7 days / users those added these calories 
    
    try{
        const response = await lastSevenDaysReport()
        if(response.error){
            res.status(400);
            res.json(errorResponse(response.payload))
            return;
        }
        const response2 = await usersAvgCaloriesReport()
        if(response2.error){
            res.status(400);
            res.json(errorResponse(response2.payload))
            return;
        }
    
        res.json(successResponse({report1: response.payload, report2: response2.payload}))
    }catch(e){
        res.status(500);
        res.json(errorResponse(e.message))
    }
}