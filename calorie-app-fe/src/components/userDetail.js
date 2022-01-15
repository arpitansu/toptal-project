import { Table, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { foodProductAddModalReducer } from "../appstate"


export function UserDetail({user}) {
    const dispatch = useDispatch()

    return (
        <Table bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Calorie Limit</th>
                <th>Admin</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.calorieLimit}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td className="col-2" style={{textAlign:"center"}}>
                        <Button onClick={() => {
                            dispatch(foodProductAddModalReducer(true))
                        }}>Add Product</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}