import React, { useEffect, useState } from 'react';
import { BiExit } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { FaRegCopy } from 'react-icons/fa';

import { db } from '../firebase';
import { useAuth } from '../state/authState';
import Message from './Message';
import RoomChatInput from './RoomChatInput';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const RoomRight = ({ roomName, roomId, roomAmdin }) => {
  const history = useHistory();
  const currentUser = useAuth((state) => state.currentUser);
  const [msgs, setMesgs] = useState([]);
  const [copied, setCopied] = useState(false);

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

  const handleLeaveRoom = async () => {
    try {
      await db
        .collection('rooms')
        .doc(roomId)
        .collection('roomMates')
        .doc(currentUser.uid)
        .delete();

      history.push('/dashboard');
    } catch (err) {
      console.log('error deleting roomate');
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

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
        <div style={{ display: 'flex' }}>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-copy-roomid">
                {!copied ? <span>Copy Room Id</span> : <span>Copied!</span>}
              </Tooltip>
            }
          >
            <div
              style={{ cursor: 'pointer', margin: '0 8px' }}
              onClick={copyRoomId}
            >
              <FaRegCopy style={{ fontSize: '1.5rem', color: '#30336b' }} />
            </div>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip-leave-room">Leave room</Tooltip>}
          >
            <div
              style={{ cursor: 'pointer', margin: '0 8px' }}
              onClick={handleLeaveRoom}
            >
              <BiExit style={{ fontSize: '1.5rem', color: '#eb4d4b' }} />
            </div>
          </OverlayTrigger>
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
