import React from 'react';
import './MessageInbox.scss';

const dummyMessages = [
  {
    id: 1,
    sender: 'John Doe',
    subject: 'Hello',
    message: 'Hey there, how are you?',
    timestamp: '2023-08-09T12:30:00Z',
  },
  {
    id: 2,
    sender: 'Jane Smith',
    subject: 'Meeting Tomorrow',
    message: 'We have a meeting scheduled for tomorrow. Don\'t forget!',
    timestamp: '2023-08-08T15:45:00Z',
  },
  // Add more dummy messages as needed
];

const MessageInbox = () => {
  return (
    <div className="message-inbox">
      <h1>Message Inbox</h1>
      <div className="message-list">
        {dummyMessages.map(message => (
          <div key={message.id} className="message-item">
            <div className="message-sender">{message.sender}</div>
            <div className="message-subject">{message.subject}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageInbox;
