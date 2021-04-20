import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useAuth } from '../state/authState';

const CreateRoomModel = ({ show, handleClose }) => {
  //   const history = useHistory();
  const [data, setData] = useState({ roomId: '' });
  //   const [loading, setLoading] = useState(false);
  //   const currentUser = useAuth((state) => state.currentUser);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Join Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Room Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter room id"
            onChange={(e) => setData({ ...data, roomId: e.target.value })}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Join
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateRoomModel;
