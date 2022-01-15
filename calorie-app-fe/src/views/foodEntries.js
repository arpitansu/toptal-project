import {useSelector} from 'react-redux'
import { FoodList } from '../components/foodList'
import { ProductAdd } from '../components/productAdd'
import { useEffect, useState } from 'react'
import { addFoodByUser, getUserFood } from '../apicalls'
import moment from 'moment'
import { UserDetail } from '../components/userDetail'

export function FoodEntries(){

    const {food} = useSelector(store => store)
    const {user} = useSelector(store => store)
    const {calorieLimit, _id} = user
    const [add, setAdd] = useState({dateOfConsumption : '', timeOfConsumption: '', name: '', calorie: 0})

    useEffect(() => {
        getUserFood()
    }, [])

    const submitAddFood = async (data) => {
        const { timeOfConsumption, name, calorie } = data
        const dateOfConsumption = moment(data.dateOfConsumption).format()
        await addFoodByUser(dateOfConsumption, timeOfConsumption, name, calorie)
        getUserFood()
    }

    return (
        <div style={{marginTop : "5px"}}>
            <h2 style={{textAlign: 'center'}}>User Details</h2>
            <UserDetail user={user}></UserDetail>
            <h2 style={{textAlign: 'center'}}>User Calorie Details</h2>
            {
                food && food.length ? <FoodList food={food} calorieLimit={calorieLimit}></FoodList> : null
            }
            <ProductAdd caller={'admin'} data={add} setAdd={setAdd} submit={submitAddFood}></ProductAdd>
        </div>
    )
}