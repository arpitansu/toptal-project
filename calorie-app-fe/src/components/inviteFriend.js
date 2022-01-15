import {Button, Modal, Form} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {inviteFriendReducer} from "../appstate"
import {inviteFriend} from '../apicalls/index'

export function InviteFriend() {

    const {inviteFriendModal} = useSelector(state => state.component)
    const dispatch = useDispatch()

    const submitForm = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const name = e.target[1].value
        const res = await inviteFriend(email, name)
        if(res.error === false){
            e.target.reset()
            dispatch(inviteFriendReducer(false))
        }
    }

    const InviteForm = () => {
        return (
            <Form onSubmit={submitForm} id="inviteFriendForm">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email*" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name*" required/>
                </Form.Group>
            </Form>
        )
    }
    
    const InviteModal = () => {


        return (
            <>        
              <Modal
                show={inviteFriendModal}
                onHide={() => dispatch(inviteFriendReducer(false))}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Invite Your Friend To Calorie App</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {InviteForm()}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => dispatch(inviteFriendReducer(false))}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" form="inviteFriendForm">Invite</Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }

    return (
        <div>
            <InviteModal></InviteModal>
        </div>
    )
}