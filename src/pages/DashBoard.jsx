import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { ImEnter } from 'react-icons/im';
import CreateRoomModel from '../components/CreateRoomModel';
import DashBoardUserRoomCard from '../components/DashBoardUserRoomCard';
import JoinRoomModel from '../components/JoinRoomModel';
import { db } from '../firebase';
import '../index.css';

const DashBoard = () => {
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const rooms = [];
    const unsub = db
      .collection('rooms')
      .get()
      .then((qs) => {
        qs.docs.forEach((room) => {
          rooms.push({ roomId: room.id, ...room.data() });
        });
        setRooms(rooms);
      })
      .catch((err) => {
        console.log(err.message);
      });
    return unsub;
  }, []);

  return (
    <div style={{ marginTop: '1rem' }}>
      <Row>
        <Col md={6}>
          <Card className="dashBoardModelCard" onClick={handleShow1}>
            <Card.Body>
              <Card.Title>
                <FaPlus style={{ fontSize: '2em' }} />
              </Card.Title>
              <Card.Title>Create a room</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="dashBoardModelCard" onClick={handleShow2}>
            <Card.Body>
              <Card.Title>
                <ImEnter style={{ fontSize: '2em' }} />
              </Card.Title>
              <Card.Title>Join a room</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <CreateRoomModel show={show1} handleClose={handleClose1} />
        <JoinRoomModel show={show2} handleClose={handleClose2} />
      </Row>

      <Row className="mt-4 pb-2">
        <Col>
          <h4 className="m-0">All Rooms</h4>
        </Col>
      </Row>

      <Row>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <DashBoardUserRoomCard
              roomName={room.roomName}
              roomId={room.roomId}
              roomAdmin={room.admin}
              key={room.roomId}
            />
          ))
        ) : (
          <p color="gray.500">No Rooms :) </p>
        )}
      </Row>
    </div>
  );
};

export default DashBoard;
