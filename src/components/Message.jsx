import React from 'react';

const Message = ({ isAuthUser, text }) => {
  return (
    <>
      {isAuthUser ? (
        <div
          style={{
            background: 'lightblue',
            padding: '0.75rem 0.5rem',
            marginLeft: 'auto',
            borderRadius: '10px',
            borderTopRightRadius: '0',
          }}
          className="my-1"
        >
          <p>{text}</p>
        </div>
      ) : (
        <div
          style={{
            background: 'lightgray',
            padding: '0.75rem 0.5rem',
            marginRight: 'auto',
            borderRadius: '10px',
            borderTopLeftRadius: '0',
          }}
        >
          <p>{text}</p>
        </div>
      )}
    </>
  );
};

export default Message;
