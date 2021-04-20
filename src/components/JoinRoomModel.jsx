import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import firebase from 'firebase';

import { db } from '../firebase';
import { useAuth } from '../state/authState';

const CreateRoomModel = ({ show, handleClose }) => {
  const history = useHistory();
  const [data, setData] = useState({ roomId: '' });
  const currentUser = useAuth((state) => state.currentUser);
  const authUserRef = useAuth((state) => state.authUserRef);

  const handleJoinRoom = async (roomId) => {
    try {
      const roomMatesQS = await db
        .collection('rooms')
        .doc(roomId)
        .collection('roomMates')
        .where('username', '==', currentUser.displayName)
        .get();

      if (!roomMatesQS.empty) {
        // history.push(`/room/${roomId}`);
        return handleClose();
      }
    } catch (err) {
      console.log('asdfasdf');
      console.log(err.message);
    }
    // ? ADDS YOU TO ROOMMATES COLLECTIONS OF THE ROOM
    try {
      await db
        .collection('rooms')
        .doc(roomId)
        .collection('roomMates')
        .doc(currentUser.uid)
        .set({ username: currentUser.displayName });

      // history.push(`/room/${roomId}`);
    } catch (err) {
      console.log('error in joining room');
    }

    //? ADDS ACTIVE ROOM IN USER DOCUMENT
    try {
      await authUserRef.update({
        activeRooms: firebase.firestore.FieldValue.arrayUnion(roomId),
      });
    } catch (err) {
      console.log('error in adding active room to authenticated user');
    }
    handleClose();
  };

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
        <Button variant="primary" onClick={() => handleJoinRoom(data.roomId)}>
          <span>Join</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateRoomModel;
