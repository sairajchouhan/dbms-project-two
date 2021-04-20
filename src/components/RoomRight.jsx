import React from 'react';
import { useAuth } from '../state/authState';
import RoomChatInput from './RoomChatInput';

const RoomRight = ({ roomName, roomId, roomAmdin }) => {
  const currentUser = useAuth((state) => state.currentUser);
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
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid lightgray',
        }}
      >
        <h5>{roomName}</h5>
      </div>
      <div style={{ height: '92%' }}>
        <div
          style={{
            height: '90%',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column-reverse',
            padding: '0 1.5rem',
          }}
        >
          messeges go here
        </div>
        <RoomChatInput roomId={roomId} sender={currentUser.displayName} />
      </div>
    </div>
  );
};

export default RoomRight;
