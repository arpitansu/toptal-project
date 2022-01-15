import {Button, Modal, Form} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {foodProductModalReducer} from "../appstate"

export function ProductEdit({caller, data, setEdit, submit}) {
 
    const {foodProductEditModal} = useSelector(state => state.component)
    const dispatch = useDispatch()

    const submitForm = async (e) => {
        e.preventDefault()
        submit(data)
        dispatch(foodProductModalReducer(false))
    }

    const FoodProductForm = () => {
        return (
            <Form onSubmit={submitForm} id="foodProductForm">

                <Form.Group className="mb-3" controlId="formBasicTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control value={data.time} onChange={(e) => {setEdit({...data, time: e.target.value})}} type="time" placeholder="Enter Time*" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Food Name</Form.Label>
                    <Form.Control value={data.name} onChange={(e) => setEdit({...data, name: e.target.value})} type="text" placeholder="Enter Food Name*" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCalorie">
                    <Form.Label>Calorie</Form.Label>
                    <Form.Control value={data.calorie} onChange={(e) => setEdit({...data, calorie: e.target.value})} type="number" placeholder="Enter Food Calorie*" required/>
                </Form.Group>
            </Form>
        )
    }
    
    const FoodEditModal = () => {


        return (
            <>        
              <Modal
                show={foodProductEditModal}
                onHide={() => dispatch(foodProductModalReducer(false))}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit Food Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {FoodProductForm()}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => dispatch(foodProductModalReducer(false))}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" form="foodProductForm">Update</Button>
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