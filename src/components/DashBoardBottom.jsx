import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import DashBoardUserRoomCard from './DashBoardUserRoomCard';
import { db } from '../firebase';
import { useAuth } from '../state/authState';

const DashBoardBottom = () => {
  const [rooms, setRooms] = useState([]);
  const [activeRooms, setActiveRooms] = useState('');
  const authUserRefValues = useAuth((state) => state.authUserRefValues);

  useEffect(() => {
    const rooms = [];
    const unsub = db
      .collection('rooms')
      .where('admin', '==', authUserRefValues.username)
      .orderBy('createdAt', 'desc')
      .onSnapshot((qs) => {
        // console.log(qs.size);
        qs.docs.forEach((doc) => {
          // console.log(doc.data());
          rooms.push({ roomId: doc.id, ...doc.data() });
        });
        setRooms(rooms);
      });

    return () => {
      unsub();
    };
  }, [authUserRefValues]);

  useEffect(() => {
    const fun = async () => {
      console.log('runnig to fetch');
      const activeRooms = [];
      await authUserRefValues.activeRooms.reduce(async (memo, i) => {
        await memo;
        const res = await db.collection('rooms').doc(i).get();
        activeRooms.push({ roomId: res.id, ...res.data() });
      }, undefined);
      setActiveRooms(activeRooms);
    };

    fun();
  }, [authUserRefValues]);

  console.log(activeRooms);

  return (
    <>
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
      <p>-------------------------------</p>
      <Row>
        {activeRooms.length > 0 ? (
          activeRooms.map((room) => (
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
    </>
  );
};

export default DashBoardBottom;
