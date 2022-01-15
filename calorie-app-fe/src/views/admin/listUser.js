import {useSelector, useDispatch} from 'react-redux'
import { Table } from 'react-bootstrap'
import {useState} from 'react'
import { getAllUsers } from '../../apicalls'
import { useHistory } from 'react-router'
import { adminCurrUserReducer } from '../../appstate'


export function UsersList() {
    const {admin} = useSelector(store => store)
    const dispatch = useDispatch()
    const history = useHistory()

    useState(() => {
        //get all the users
        getAllUsers()
    }, [])

    const onSelect = (user) => {
        dispatch(adminCurrUserReducer(user))
        history.push(`/admin/users/${user._id}`)
    }

    const List = ({users}) => {

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Calories Limit</th>
                    <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user._id} style={{cursor: 'pointer'}} onClick={() => onSelect(user)}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.calorieLimit}</td>
                                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }

    return (
        <div>
            {admin?.users && admin.users.length ? <List users={admin.users}></List> : null}
        </div>
    )
}