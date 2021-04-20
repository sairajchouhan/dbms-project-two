import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import RoomLeft from '../components/RoomLeft';
import RoomRight from '../components/RoomRight';
import { db } from '../firebase';

const Room = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});

  useEffect(() => {
    db.collection('rooms')
      .doc(id)
      .get()
      .then((qs) => {
        setRoom(qs.data());
      });
  }, [id]);
  return (
    <Row style={{ height: '90vh' }}>
      <Col md={4} style={{ height: '100%' }} className="px-0">
        <RoomLeft roomId={id} />
      </Col>
      <Col md={8} className="px-0" style={{ height: '100%' }}>
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
