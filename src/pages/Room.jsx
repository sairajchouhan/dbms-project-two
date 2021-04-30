import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import RoomLeft from '../components/RoomLeft';
import RoomRight from '../components/RoomRight';
import { db } from '../firebase';
import { useAuth } from '../state/authState';

const Room = () => {
  const { id } = useParams();
  const currentUser = useAuth((state) => state.currentUser);
  const history = useHistory();

  const [room, setRoom] = useState({});

  useEffect(() => {
    const hasUserReallyJoined = currentUser.activeRooms.includes(id);
    if (hasUserReallyJoined) {
      db.collection('rooms')
        .doc(id)
        .get()
        .then((qs) => {
          setRoom(qs.data());
        });
    } else {
      history.push('/dashboard');
    }
  }, [id, currentUser, history]);

  if (Object.keys(room).length === 0) return <h1>Loading...</h1>;

  return (
    <Row
      style={{
        height: '85vh',
        border: '1px solid lightgray',
        borderRadius: '7px',
        marginTop: '1rem',
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
      }}
    >
      <Col md={3} style={{ height: '100%' }} className="px-0">
        <RoomLeft roomId={id} roomAdmin={room.admin} />
      </Col>
      <Col md={9} className="px-0" style={{ height: '100%' }}>
        <RoomRight
          roomName={room.roomName}
          roomId={id}
          roomAdmin={room.admin}
        />
      </Col>
    </Row>
  );
};

export default Room;
