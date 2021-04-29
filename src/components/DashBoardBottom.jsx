import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import DashBoardUserRoomCard from './DashBoardUserRoomCard';
import { db } from '../firebase';

const DashBoardBottom = ({ authUserRefValues }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const rooms = [];
    const unsub = db
      .collection('rooms')
      .where('roomId', 'in', authUserRefValues.createdRooms)
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
  }, [authUserRefValues]);

  return (
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
  );
};

export default DashBoardBottom;
