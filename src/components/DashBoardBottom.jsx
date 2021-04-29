import React, { useEffect, useState } from 'react';
import { Row, Tabs } from 'react-bootstrap';

import DashBoardUserRoomCard from './DashBoardUserRoomCard';
import { db } from '../firebase';
import { useAuth } from '../state/authState';
import { Tab } from 'bootstrap';

const DashBoardBottom = () => {
  const [rooms, setRooms] = useState([]);
  const [activeRooms, setActiveRooms] = useState('');
  const authUserRefValues = useAuth((state) => state.authUserRefValues);

  useEffect(() => {
    if (!authUserRefValues) return;
    const rooms = [];
    console.log(authUserRefValues);
    const unsub = db
      .collection('rooms')
      .where('admin', '==', authUserRefValues?.username)
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
      if (!authUserRefValues) return;
      console.log('runnig to fetch');
      const activeRooms = [];
      await authUserRefValues.activeRooms.reduce(async (memo, i) => {
        await memo;
        const res = await db.collection('rooms').doc(i).get();
        activeRooms.unshift({ roomId: res.id, ...res.data() });
      }, undefined);
      setActiveRooms(activeRooms);
    };

    fun();
  }, [authUserRefValues]);

  console.log(activeRooms);

  return (
    <>
      <Tabs
        className="mt-3 mb-2"
        defaultActiveKey="your"
        id="uncontrolled-tab-example"
      >
        <Tab eventKey="your" title="Your Rooms">
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
        </Tab>
        <Tab eventKey="active" title="Active Rooms">
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
        </Tab>
      </Tabs>
    </>
  );
};

export default DashBoardBottom;
