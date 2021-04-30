import React, { useEffect, useState } from 'react';

import { db } from '../firebase';
import { useAuth } from '../state/authState';
import Message from './Message';
import RoomChatInput from './RoomChatInput';
import RoomRightSettingsDropdown from './RoomRightSettingsDropdown';

const RoomRight = ({ roomName, roomId, roomAdmin }) => {
  const currentUser = useAuth((state) => state.currentUser);

  const [msgs, setMesgs] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection('roomMessages')
      .doc(roomId)
      .collection('messages')
      .orderBy('sentAt', 'desc')
      .onSnapshot((qs) => {
        setMesgs(qs.docs.map((doc) => doc.data()));
      });

    return () => {
      unsub();
    };
  }, [roomId]);

  console.log(roomAdmin);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        borderRight: '1px solid lightygray',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '8%',
          display: 'flex',
          padding: '0 16px',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid lightgray',
        }}
      >
        <h5>{roomName}</h5>
        <div>
          {/* asdfas  */}
          <RoomRightSettingsDropdown
            roomName={roomName}
            roomId={roomId}
            roomAdmin={roomAdmin}
          />
        </div>
      </div>
      <div style={{ height: '92%', padding: '10px 0' }}>
        <div
          style={{
            height: '90%',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column-reverse',
            padding: '0 1.5rem',
            paddingRight: '1rem',
          }}
        >
          {msgs.map((msg) => {
            return (
              <Message
                text={msg.msg}
                isAuthUser={currentUser.displayName === msg.sender}
                key={Math.floor(Math.random() * 99999999)}
                chatername={msg.sender}
              />
            );
          })}
        </div>
        <RoomChatInput roomId={roomId} sender={currentUser.displayName} />
      </div>
    </div>
  );
};

export default RoomRight;
