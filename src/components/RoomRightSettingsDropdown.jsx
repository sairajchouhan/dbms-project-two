import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';

import { FaRegCopy } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';
import { BiExit } from 'react-icons/bi';
import { RiDeleteBin2Line } from 'react-icons/ri';
// import { db } from '../firebase';
import { useAuth } from '../state/authState';

const RoomRightSettingsDropdown = ({ roomId, roomAdmin, roomName }) => {
  // const history = useHistory();
  const [copied, setCopied] = useState(false);
  // const currentUser = useAuth((state) => state.currentUser);
  const currentUser = useAuth((state) => state.currentUser);

  // const handleLeaveRoom = async () => {
  //   try {
  //     await db
  //       .collection('rooms')
  //       .doc(roomId)
  //       .collection('roomMates')
  //       .doc(currentUser.uid)
  //       .delete();

  //     history.push('/dashboard');
  //   } catch (err) {
  //     console.log('error deleting roomate');
  //   }
  // };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Dropdown size="sm" drop="left">
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <BsFillGearFill style={{ fontSize: '1.5rem', color: '#34495e' }} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={copyRoomId} className="px-3 py-2">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FaRegCopy
              style={{
                fontSize: '1.5rem',
                color: '#30336b',
                marginRight: '0.5rem',
              }}
            />
            <span>{copied ? 'Copied' : 'Copy Room Id'}</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item className="px-3">
          {currentUser.username === roomAdmin ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <RiDeleteBin2Line
                style={{
                  fontSize: '1.5rem',
                  color: '#eb4d4b',
                  marginRight: '0.5rem',
                }}
              />
              <span>Delete Room</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BiExit
                style={{
                  fontSize: '1.5rem',
                  color: '#eb4d4b',
                  marginRight: '0.5rem',
                }}
              />
              <span>Leave Room</span>
            </div>
          )}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RoomRightSettingsDropdown;
