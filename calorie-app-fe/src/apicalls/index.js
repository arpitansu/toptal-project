//this will load startup data
import {get, post, put, dlt} from "../service/http.service"
import {store, userReducer, foodReducer, adminUsersReducer, adminFoodReducer, adminReportReducer} from "../appstate"
import { toast } from 'react-toastify';

export function setInitialState(){
    getUser()
    getUserFood()
}

export async function addFoodByUser(dateOfConsumption, timeOfConsumption, name, calorie) {
    if(!dateOfConsumption && !timeOfConsumption && !name && !calorie) {
        toast.error('dateOfConsumption, timeOfConsumption, name, calorie, userId are required field')
        return
    }
    try{
        let response = await post(`/food`, {dateOfConsumption, timeOfConsumption, name, calorie})
        toast.success('added product')
        return response.data
    }catch(e){
        console.log(e.response)
        return e.response
    }
}

export async function getUser(){
    try{
        let user = await get("/user")
        store.dispatch(userReducer(user.data.payload))
    }catch(error){
        console.log(error.message)
    }
}

export async function getUserFood() {
    try{
        let food = await get("/food")
        store.dispatch(foodReducer(food.data.payload))
        return food.data
    }catch(error){
        console.log(error.message)
    }
}

export async function inviteFriend(email, name){
    if(!email || !name) {
        toast.error('email and name are required field')
        return
    }
    try{
        let response = await post("/user/invite-friend", {email, name})
        toast.success("Friend Invited")
        return response.data
    }catch(e){
        if(typeof e.response.data.payload === 'string') toast.error(e.response.data.payload)
        return e.response
    }
}

//admin calls below
export async function getAllUsers(force = false){
    try{
        let {admin} = store.getState()
        if(!force && admin.users.length){
            return
        }
        let response = await get("/user/all")
        store.dispatch(adminUsersReducer(response.data.payload))
        return response.data
    }catch(e){
        return e.response
    }
}

export async function getUserFoodById(userId, force = false) {
    try{
        let {admin} = store.getState()
        if(!force && admin.food.length && admin.food[0].user === userId){
            return
        }
        let response = await get(`/user/user-food?userId=${userId}`)
        store.dispatch(adminFoodReducer(response.data.payload))
        return response.data
    }catch(e){
        return e.response
    }
}

export async function updateFoodProduct(foodId, product) {
    if(!foodId || !product) {
        toast.error('foodId and product object are required field')
        return
    }
    try{
        let response = await put(`/food/${foodId}/product`, product)
        toast.success('Product detail updated')
        return response.data
    }catch(e){
        console.log(e.response)
        return e.response
    }
}

export async function deleteFoodProduct(foodId, productId) {
    if(!foodId || !productId) {
        toast.error('foodId and productId are required field')
        return
    }
    try{
        let response = await dlt(`/food/${foodId}/product/${productId}`)
        toast.success('deleted product')
        return response.data
    }catch(e){
        return e.response
    }
}

export async function report(force = false) {
    try{
        let response = await get(`/food/report`)
        let {admin} = store.getState()
        if(!force && Object.keys(admin.report).length > 0){
            return
        }
        store.dispatch(adminReportReducer(response.data.payload))
        return response.data
    }catch(e){
        return e.response
    }
}

export async function addFoodByAdmin(dateOfConsumption, timeOfConsumption, name, calorie, userId) {
    if(!dateOfConsumption && !timeOfConsumption && !name && !calorie && !userId) {
        toast.error('dateOfConsumption, timeOfConsumption, name, calorie, userId are required field')
        return
    }
    try{
        let response = await post(`/food/add`, {dateOfConsumption, timeOfConsumption, name, calorie, userId})
        toast.success('added product')
        return response.data
    }catch(e){
        console.log(e.response)
        return e.response
    }
}