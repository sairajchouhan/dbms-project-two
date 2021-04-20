import React from 'react';

const Message = ({ isAuthUser, text, chatername }) => {
  return (
    <>
      {isAuthUser ? (
        <div
          style={{
            background: 'lightblue',
            padding: '0.5rem 0.75rem',
            marginLeft: 'auto',
            borderRadius: '10px',
            borderTopRightRadius: '0',
          }}
          className="my-1"
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontStyle: 'italic',
              textAlign: 'end',
            }}
          >
            {chatername}
          </div>
          <p>{text}</p>
        </div>
      ) : (
        <div
          style={{
            background: 'lightgray',
            padding: '0.5rem 0.75rem',
            marginRight: 'auto',
            borderRadius: '10px',
            borderTopLeftRadius: '0',
          }}
          className="my-1"
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontStyle: 'italic',
              textAlign: 'start',
            }}
          >
            {chatername}
          </div>
          <p>{text}</p>
        </div>
      )}
    </>
  );
};

export default Message;
