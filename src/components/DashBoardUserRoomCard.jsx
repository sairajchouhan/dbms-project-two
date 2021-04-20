import React from 'react';
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
    <div className="dashBoardUserRoomCard" onClick={handleJoinRoom}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{roomName}</p>
        {currentUser.displayName === roomAdmin && <p>You are admin</p>}
      </div>
    </div>
  );
};

export default DashBoardUserRoomCard;
