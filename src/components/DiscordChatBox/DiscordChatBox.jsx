import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FaDiscord } from 'react-icons/fa';
import './DiscordChatBox.scss';

const statusColors = {
  online: 'green',
  dnd: 'red',
  offline: 'gray',
  idle: 'orange',
};

export default function DiscordChatBox() {
  const [status, setStatus] = useState('offline');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [canSend, setCanSend] = useState(true);

  useEffect(() => {
    fetch('https://discord-bot-status-production-e187.up.railway.app/api/status')
      .then(res => res.json())
      .then(data => setStatus(data.status || 'offline'))
      .catch(() => setStatus('offline'));

    const newSocket = io('https://discord-bot-status-production-e187.up.railway.app');
    setSocket(newSocket);

    newSocket.on('chat message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    newSocket.on('statusUpdate', (newStatus) => {
      setStatus(newStatus);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const toggleOpen = () => setIsOpen(open => !open);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    if (!canSend) {
      alert("Merci d'attendre avant d'envoyer un nouveau message.");
      return;
    }

    socket.emit('chat message', input.trim());
    setMessages(prev => [...prev, { from: 'me', content: input.trim() }]);
    setInput('');
    setCanSend(false);

    setTimeout(() => {
      setCanSend(true);
    }, 5000);
  };

  return (
    <div className={`discord-chatbox ${isOpen ? 'open' : ''}`}>
      <div className="header" onClick={toggleOpen}>
        <FaDiscord size={18} color="#7289da" />
        <span className="status-dot" style={{ backgroundColor: statusColors[status] || 'gray' }} />
        <span className="status-text">
          {status === 'online' && 'En ligne'}
          {status === 'dnd' && 'Ne pas déranger'}
          {status === 'offline' && 'Hors ligne'}
          {status === 'idle' && 'Inactif'}
        </span>
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="info-banner">
            Tu m’envoies un message directement sur Discord 👋
          </div>

          <div className="messages">
            {messages.length === 0 && <p className="no-msg">Pas de messages</p>}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${msg.from === 'me' ? 'from-me' : 'from-other'}`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Écris un message..."
            />
            <button onClick={sendMessage} disabled={!canSend}>Envoyer</button>
          </div>
        </div>
      )}
    </div>
  );
}
