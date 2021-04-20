import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { ImEnter } from 'react-icons/im';
import CreateRoomModel from '../components/CreateRoomModel';
import DashBoardUserRoomCard from '../components/DashBoardUserRoomCard';
import JoinRoomModel from '../components/JoinRoomModel';

const DashBoard = () => {
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  return (
    <div style={{ marginTop: '1rem' }}>
      <Row>
        <Col md={6}>
          <Card
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              background: '#d2dae2',
              border: 'none',
            }}
            onClick={handleShow1}
          >
            <Card.Body>
              <Card.Title>
                <FaPlus style={{ fontSize: '2em' }} />
              </Card.Title>
              <Card.Title>Create a room</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              background: '#d2dae2',
              border: 'none',
            }}
            onClick={handleShow2}
          >
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
      <Row style={{ marginTop: '1.5rem' }}>
        <DashBoardUserRoomCard roomName="asd" />
      </Row>
    </div>
  );
};

export default DashBoard;
