import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
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
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Générer un UID unique si non présent
    let uid = localStorage.getItem('chat_uid');
    if (!uid) {
      uid = Math.random().toString(36).slice(2, 10);
      localStorage.setItem('chat_uid', uid);
    }
    setUserId(uid);

    // Récupérer le statut initial
    fetch('https://discord-bot-status-production-e187.up.railway.app/api/status')
      .then(res => res.json())
      .then(data => setStatus(data.status || 'offline'))
      .catch(() => setStatus('offline'));

    // Connexion socket.io
    const newSocket = io('https://discord-bot-status-production-e187.up.railway.app', {
      query: { uid }
    });
    setSocket(newSocket);

    // Recevoir les messages destinés à cet utilisateur uniquement
    newSocket.on('private message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    // Mise à jour du statut Discord
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

    const msgObject = {
      uid: userId,
      content: input.trim(),
    };

    socket.emit('private message', msgObject);
    setMessages(prev => [...prev, { from: 'me', content: input.trim() }]);
    setInput('');
    setCanSend(false);

    setTimeout(() => setCanSend(true), 5000);
  };

  return (
    <div className={`discord-chatbox ${isOpen ? 'open' : ''}`}>
      <div className="header" onClick={toggleOpen}>
        <span
          className="status-dot"
          style={{ backgroundColor: statusColors[status] || 'gray' }}
        />
        <span className="status-text">
          {status === 'online' && 'En ligne'}
          {status === 'dnd' && 'Ne pas déranger'}
          {status === 'offline' && 'Hors ligne'}
          {status === 'idle' && 'Inactif'}
        </span>
      </div>

      {isOpen && (
        <div className="chat-window">
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
