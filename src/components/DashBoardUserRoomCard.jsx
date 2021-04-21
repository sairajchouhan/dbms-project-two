import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { db } from '../firebase';
import '../index.css';
import { useAuth } from '../state/authState';

const DashBoardUserRoomCard = ({ roomName, roomId, roomAdmin, ...props }) => {
  const history = useHistory();
  const currentUser = useAuth((state) => state.currentUser);
  const handleJoinRoom = async () => {
    //? THIS TRY CHEKS IF YOU ARE ALREADY IN ROOM
    //? IF YOU ARE ALREADY IN ROOM THEN JUST JOIN
    try {
      const roomMatesQS = await db
        .collection('rooms')
        .doc(roomId)
        .collection('roomMates')
        .where('username', '==', currentUser.displayName)
        .get();

      if (!roomMatesQS.empty) {
        history.push(`/room/${roomId}`);
        return;
      }
    } catch (err) {
      console.log(err.message);
    }
    // ? ADDS YOU TO ROOMMATES COLLECTIONS OF THE ROOM
    try {
      await db
        .collection('rooms')
        .doc(roomId)
        .collection('roomMates')
        .doc(currentUser.uid)
        .set({ username: currentUser.displayName });

      history.push(`/room/${roomId}`);
    } catch (err) {
      console.log('error in joining room');
    }
  };

  return (
    <div className="dashBoardUserRoomCard">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p className="mr-3">{roomName}</p>
        {currentUser.displayName === roomAdmin && (
          <p style={{ fontSize: '0.75rem', color: 'gray' }}>You are admin</p>
        )}
      </div>
      <Button size="sm" variant="success" onClick={handleJoinRoom}>
        Join
      </Button>
    </div>
  );
};

export default DashBoardUserRoomCard;
