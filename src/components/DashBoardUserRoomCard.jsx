import React from 'react';
import '../index.css';

const DashBoardUserRoomCard = ({ roomName, roomId, roomAdmin, ...props }) => {
  return <div className="dashBoardUserRoomCard">{roomName}</div>;
};

export default DashBoardUserRoomCard;
