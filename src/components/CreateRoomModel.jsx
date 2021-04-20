import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useAuth } from '../state/authState';

const CreateRoomModel = ({ show, handleClose }) => {
  //   const history = useHistory();
  const [data, setData] = useState({ roomName: '' });
  //   const [loading, setLoading] = useState(false);
  //   const currentUser = useAuth((state) => state.currentUser);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Room Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter room name"
            onChange={(e) => setData({ ...data, roomName: e.target.value })}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateRoomModel;
