import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import DashBoardUserRoomCard from './DashBoardUserRoomCard';
import { db } from '../firebase';
import { useAuth } from '../state/authState';

const DashBoardBottom = () => {
  const [rooms, setRooms] = useState([]);
  const authUserRefValues = useAuth((state) => state.authUserRefValues);

  useEffect(() => {
    const rooms = [];
    console.log('executing useEffect in DashboardBottom');
    const unsub = db
      .collection('rooms')
      .where('admin', '==', authUserRefValues.username)
      .orderBy('createdAt', 'desc')
      .onSnapshot((qs) => {
        // console.log(qs.size);
        qs.docs.forEach((doc) => {
          console.log(doc.data());
          rooms.push({ roomId: doc.id, ...doc.data() });
        });
        setRooms(rooms);
      });

    return () => {
      unsub();
    };
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
