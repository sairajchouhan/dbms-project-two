import React, { useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

import { FiSend } from 'react-icons/fi';
import { db, timestamp } from '../firebase';

const RoomChatInput = ({ roomId, sender }) => {
  const [msg, setMsg] = useState('');
  const sendMessage = async () => {
    try {
      await db
        .collection('roomMessages')
        .doc(roomId)
        .collection('messages')
        .add({
          msg,
          sender,
          sentAt: timestamp(),
        });
      setMsg('');
    } catch (err) {
      console.log('error in sending message');
    }
  };

  return (
    <div
      style={{
        height: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '94%' }}>
        <InputGroup>
          <FormControl
            placeholder="Send message..."
            aria-label="send message"
            aria-describedby="basic-addon2"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyUp={(e) => {
              if (e.code === 'Enter') sendMessage();
            }}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={sendMessage}
              style={{ padding: '0 10px' }}
            >
              <FiSend style={{ fontSize: '1.75em' }} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    </div>
  );
};

export default RoomChatInput;
