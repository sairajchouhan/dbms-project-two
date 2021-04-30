import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import firebase from 'firebase';

import { db, timestamp } from '../firebase';
import { useAuth } from '../state/authState';

const CreateRoomModel = ({ show, handleClose }) => {
  const history = useHistory();
  const [data, setData] = useState({ roomName: '' });
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth((state) => state.currentUser);
  const currentUserRef = useAuth((state) => state.currentUserRef);

  const handleCreateRoom = async () => {
    setLoading((loading) => !loading);
    const roomData = {
      roomName: data.roomName,
      admin: currentUser.username,
      createdAt: timestamp(),
    };
    try {
      const room = await db.collection('rooms').add(roomData);
      await db
        .collection('rooms')
        .doc(room.id)
        .update({
          roomId: room.id,
          roomMates: [{ uid: currentUser.uid, username: currentUser.username }],
        });

      await currentUserRef.update({
        activeRooms: firebase.firestore.FieldValue.arrayUnion(room.id),
      });

      history.push(`/room/${room.id}`);
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
      console.log('error in creating a room or joining a room');
    }

    setLoading((loading) => !loading);

    handleClose();
  };

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
        <Button variant="primary" onClick={handleCreateRoom}>
          {loading ? <span>Creating...</span> : <span>Create</span>}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateRoomModel;
