import {useSelector, useDispatch} from 'react-redux'
import { FoodList } from '../../components/foodList'
import {useEffect, useState} from 'react'
import { addFoodByAdmin, deleteFoodProduct, getUserFoodById, updateFoodProduct } from '../../apicalls'
import { AddFoodEntry } from '../../components/addFoodEntry'
import { Table, Button } from 'react-bootstrap'
import { ProductEdit } from '../../components/productEdit'
import { ProductAdd} from '../../components/productAdd'
import { foodProductAddModalReducer } from '../../appstate'
import moment from 'moment'
import { UserDetail } from '../../components/userDetail'

export function UsersFoodEntried({match}) {

    const {userId} = match.params
    const dispatch = useDispatch()
    const {food} = useSelector(store => store.admin)
    const {currUser} = useSelector(store => store.admin)
    const [edit, setEdit] = useState({foodId : '', time: '', name: '', calorie: 0, _id: ''})
    const [add, setAdd] = useState({dateOfConsumption : '', timeOfConsumption: '', name: '', calorie: 0})
  
    useEffect(() => {
        getUserFoodById(userId)
    }, [])

    const submitEditFood = async (data) => {
        const foodId = data.foodId
        delete data.foodId
        await updateFoodProduct(foodId, data)
        getUserFoodById(userId, true)
    }

    const submitAddFood = async (data) => {
        const { timeOfConsumption, name, calorie } = data
        const dateOfConsumption = moment(data.dateOfConsumption).format()
        await addFoodByAdmin(dateOfConsumption, timeOfConsumption, name, calorie, userId)
        getUserFoodById(userId, true)
    }

    const submitDeleteFood = async (foodId, data) => {
        await deleteFoodProduct(foodId, data._id)
        getUserFoodById(userId, true)
    }

    return (
        <div style={{marginTop: '10px'}}>
            <h2 style={{textAlign: 'center'}}>User Details</h2>
            <UserDetail user={currUser}></UserDetail>
            <h2 style={{textAlign: 'center'}}>User Calorie Details</h2>
            {
                food && food.length ? <FoodList caller={'admin'} food={food} calorieLimit={currUser.calorieLimit} setEdit={setEdit} deleteFoodProduct={submitDeleteFood}></FoodList> : null	
            }
            <ProductEdit caller={'admin'} data={edit} setEdit={setEdit} submit={submitEditFood}></ProductEdit>
            <ProductAdd caller={'admin'} data={add} setAdd={setAdd} submit={submitAddFood}></ProductAdd>
        </div>
    )
}