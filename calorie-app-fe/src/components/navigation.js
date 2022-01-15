import {Nav, Navbar, Container, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import {inviteFriendReducer} from "../appstate"

export function Navigation(){
    const {isAdmin} = useSelector(state => state.user)
    const dispatch = useDispatch()


    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Calorie App</Navbar.Brand>
                    <Nav className="me-auto">
                    <Link to="/food-entries" className="nav-link"> Food Entries</Link>
                    <Link to="/meal-plan" className="nav-link">Meal Plan</Link>
                    {
                        isAdmin ? 
                        <Link to="/admin/users" className="nav-link">Users</Link> : null
                    }
                    {
                        isAdmin ? 
                        <Link to="/admin/users-report" className="nav-link">Users Report</Link> : null
                    }
                    </Nav>
                    <Button variant="outline-success" onClick={() => dispatch(inviteFriendReducer(true))}>Invite Friend</Button>
                </Container>
            </Navbar>
        </>
    )
}