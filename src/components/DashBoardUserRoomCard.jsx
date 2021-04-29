import React from 'react';
import { useHistory } from 'react-router-dom';

import '../index.css';
import { useAuth } from '../state/authState';

const DashBoardUserRoomCard = ({ roomName, roomId, roomAdmin, ...props }) => {
  const currentUser = useAuth((state) => state.currentUser);
  const history = useHistory();

  const handleEnterRoom = () => {
    history.push(`/room/${roomId}`);
  };

  return (
    <div {...props} className="dashBoardUserRoomCard" onClick={handleEnterRoom}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <p className="mr-3">{roomName}</p>
        {currentUser.displayName === roomAdmin && (
          <p style={{ fontSize: '0.75rem', color: 'gray' }}>You are admin</p>
        )}
      </div>
    </div>
  );
};

export default DashBoardUserRoomCard;
