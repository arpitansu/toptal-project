import { Table, Button, ListGroup, Row, Col } from 'react-bootstrap' 
import moment from 'moment'
import {useSelector, useDispatch} from 'react-redux'
import { foodProductModalReducer } from '../appstate'

export function FoodList({caller, food, calorieLimit, setEdit, deleteFoodProduct}){
    const {isAdmin} = useSelector(state => state.user)
    const dispatch = useDispatch()

    const AddFood = () => {
        return (
            <div>
                <Button>Add Food</Button>
            </div>
        )
    }

    const FoodDate = ({item}) => {
        return (
            <>
            <ListGroup horizontal>
                <ListGroup.Item>Date: {moment(item.dateOfConsumption).format("MMM Do YY")}</ListGroup.Item>
                <ListGroup.Item variant={calorieLimit < item.totalCalories ? 'danger' : 'success'}>Total Calories: {item.totalCalories}</ListGroup.Item>
            </ListGroup>
            </>
        )
    }

    const FoodTable = ({food}) => {
        return (
            <div>
                {
                    food.map(item => 
                        item.product.length ? 
                        <div key={item._id}>
                            <FoodDate item={item}></FoodDate>
                            <FoodItem items={item.product} foodId={item._id}></FoodItem>
                        </div> : null
                    )
                }
            </div>
        )   
    }
    
    const FoodItem = ({items, foodId}) => {
        return (
            <Table bordered hover style={{marginTop : "4px"}}>
                <thead>
                    <tr>
                    <th>Time</th>
                    <th>Food</th>
                    <th>Calorie</th>
                    {
                        caller === 'admin' && isAdmin ? <th>Action</th> : null
                    }
                    {
                        caller === 'admin' && isAdmin ? <th></th> : null
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(item => (
                            <tr key={item._id}>
                                <td>{moment(item.time, "HH:mm").format("hh:mm A")}</td>
                                <td>{item.name}</td>
                                <td>{item.calorie}</td>
                                {
                                    caller === 'admin' && isAdmin ? <td className="col-1" style={{textAlign:"center"}}>
                                        <Button onClick={() => {
                                            setEdit({foodId, ...item})
                                            dispatch(foodProductModalReducer(true))
                                        }}>Edit</Button>
                                    </td> : null
                                }
                                {
                                    caller === 'admin' && isAdmin ? <td className="col-1" style={{textAlign:"center"}}>
                                        <Button variant="danger" onClick={() => {
                                            if (window.confirm("Confirm to delete")) {
                                                deleteFoodProduct(foodId, item)
                                              }
                                        }}>Delete</Button>
                                    </td> : null
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }


    return (
        <div style={{marginTop : "10px"}}>
            {
                food && food.length ? <FoodTable food={food}></FoodTable> : <AddFood></AddFood>
            }
        </div>
    )
}