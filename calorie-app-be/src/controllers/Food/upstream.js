const {Food} = require("../../database/models")
const {upstreamSuccessResponse, upstreamErrorResponse} = require("../../utilities/responseMsg")
const moment = require('moment')

module.exports.createFood = async ({name, dateOfConsumption, timeOfConsumption, calorie, user}) => {

    let endDate = moment(dateOfConsumption).add(1, "days").format()
    //find if this user has data with this dateOfConsumption
    let findFood = await Food.findOne({dateOfConsumption : {
        $gte: dateOfConsumption, 
        $lt: endDate
    }, user})
    if(findFood){
        //then update that food product array
        let product = []
        product = findFood.product
        product.push({name, calorie, time: timeOfConsumption})

        let total = findFood.totalCalories + Number(calorie)

        try{
            await Food.updateOne({_id: findFood._id, }, {$set: {product, totalCalories: total}})
            return upstreamSuccessResponse(`${name} added successfully`)
        }catch(error){
            return upstreamErrorResponse(error.message)
        }

    }
    //else create new food
    try{
        let product = [{name, calorie, time: timeOfConsumption}]
        await Food.create({dateOfConsumption, product, user, totalCalories: calorie})
        return upstreamSuccessResponse(`${name} added successfully`)
    }catch(error){
        return upstreamErrorResponse(error.message)
    }
}

module.exports.getFood = async (id) => {
    try{
        let food = await Food.find({user: id})
        return upstreamSuccessResponse(food)
    }catch(error){
        return upstreamErrorResponse(error.message)
    }
}

//admin functions

module.exports.updateFood = async (foodId, foodData) => {
    try{
        
        let food = await Food.findById(foodId);
        if(!food) throw new Error('no records found')
        
        //find if same dataOfConsumption already there then reject
        let doc = await Food.findOne({...foodData, user: food.user})
        if(doc) throw new Error('duplicate records update not allowed')

        await Food.updateOne({_id: foodId}, {$set : {...foodData}})
        return upstreamSuccessResponse("food updated")
    }catch(error){
        return upstreamErrorResponse(error.message)
    }
}

module.exports.updateFoodProduct = async (foodId, product) => {

    try{
        let food = await Food.findById(foodId);
        if(!food) throw new Error('no records found')

        //find the product to be updated
        let productList = food.product
        let totalCalories = food.totalCalories
        for(let i = 0; i < productList.length; i++){
            if(productList[i]._id == product._id){
                totalCalories += product.calorie - productList[i].calorie
                productList[i] = product
                break;
            }
        }
        await Food.updateOne({_id: foodId}, {$set : {product: productList, totalCalories}})
        return upstreamSuccessResponse("food updated")
    }catch(error){
        return upstreamErrorResponse(error.message)
    }

}

module.exports.deleteFoodProduct = async (foodId, productId) => {
    try{
        let food = await Food.findById(foodId);
        if(!food) throw new Error('no records found')

        //find the product to be removed
        let productList = food.product.filter(item => item._id != productId);

        let totalCalories = 0
        for(let i = 0; i < productList.length; i++){
            totalCalories += productList[i].calorie
        }

        await Food.updateOne({_id: foodId}, {$set : {product: productList, totalCalories}})
        return upstreamSuccessResponse("product deleted")
    }catch(error){
        return upstreamErrorResponse(error.message)
    }
}

module.exports.deleteFood = async (foodId) => {
    try{
        await Food.deleteOne({_id: foodId})
        return upstreamSuccessResponse("food deleted")
    }catch(error){
        return upstreamErrorResponse(error.message)
    }
}

module.exports.lastSevenDaysReport = async () => {
    //this last 7days vs 7days before total entries
    try{
        //get all added data in last 7 days
        let today = moment().format()
        let todayMinus7 = moment().subtract(7, 'days').format()

        let lastWeekToday = moment().subtract(8, 'days').format()
        let lastWeekTodayMinus7 = moment().subtract(8+7, 'days').format()

        let first7days = await entriesBetweenDates(todayMinus7, today)

        let totaEntries7days = 0;
        for(let i =0;i < first7days.length; i++){
            totaEntries7days += first7days[i].product.length
        }

        let before7days = await entriesBetweenDates(lastWeekTodayMinus7, lastWeekToday)

        let totaEntriesBefore7days = 0;
        for(let i =0;i < before7days.length; i++){
            totaEntriesBefore7days += before7days[i].product.length
        }

        return upstreamSuccessResponse({first7days: totaEntries7days, before7days: totaEntriesBefore7days})
    }catch(error){
        return upstreamErrorResponse(error.message)
    }
}

module.exports.usersAvgCaloriesReport = async () => {
    //avg calories added per user in last 7 days  = all calories added in 7 days / users those added these calories
    try{
        //get all added entries calories in last 7 days
        //get all diff users added those calories
        let today = moment().format()
        let todayMinus7 = moment().subtract(7, 'days').format()

        let entries = await entriesBetweenDates(todayMinus7, today)

        let map = {}
        for(let i = 0; i < entries.length; i++){
            if(map[entries[i].user]) map[entries[i].user] = map[entries[i].user] + entries[i].totalCalories
            else map[entries[i].user] = entries[i].totalCalories
        }
        let totalUsers = Object.keys(map).length
        let totalCalories = 0
        
        for(let i in map){
            totalCalories += map[i]
        }
        
        let avgCalories7days = totalCalories / totalUsers
        return upstreamSuccessResponse({avgCalories7days})
    }catch(error){
        return upstreamErrorResponse(error.message)
    }
}


//utils functions
const entriesBetweenDates = async (from, to) => {
    try{
        let response = await Food.find({
            dateOfConsumption: {
                $gte: from,
                $lte: to
            }
        })

        return response
    }catch(error){
        return error
    }
}

