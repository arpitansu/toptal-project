import {Button, Modal, Form} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {foodProductAddModalReducer} from "../appstate"

export function ProductAdd({caller, data, setAdd, submit}) {
 
    const {foodProductAddModal} = useSelector(state => state.component)
    const dispatch = useDispatch()

    const submitForm = async (e) => {
        e.preventDefault()
        submit(data)
        dispatch(foodProductAddModalReducer(false))
    }

    const FoodProductForm = () => {
        return (
            <Form onSubmit={submitForm} id="foodProductForm">

                <Form.Group className="mb-3" controlId="formBasicTime">
                    <Form.Label>Date Of Consumption</Form.Label>
                    <Form.Control onChange={(e) => {setAdd({...data, dateOfConsumption: e.target.value})}} type="date" placeholder="Enter Time*" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control onChange={(e) => {setAdd({...data, timeOfConsumption: e.target.value})}} type="time" placeholder="Enter Time*" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Food Name</Form.Label>
                    <Form.Control onChange={(e) => setAdd({...data, name: e.target.value})} type="text" placeholder="Enter Food Name*" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCalorie">
                    <Form.Label>Calorie</Form.Label>
                    <Form.Control onChange={(e) => setAdd({...data, calorie: e.target.value})} type="number" placeholder="Enter Food Calorie*" required/>
                </Form.Group>
            </Form>
        )
    }
    
    const FoodEditModal = () => {


        return (
            <>        
              <Modal
                show={foodProductAddModal}
                onHide={() => dispatch(foodProductAddModalReducer(false))}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add Food Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {FoodProductForm()}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => dispatch(foodProductAddModalReducer(false))}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" form="foodProductForm">Add</Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }

    return (
        <div>
            {FoodEditModal()}
        </div>
    )
}