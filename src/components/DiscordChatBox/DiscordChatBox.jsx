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
    const DISCORD_API_URL = 'https://discord-bot-status-production-e187.up.railway.app';

    if (!DISCORD_API_URL.startsWith('https://')) {
      console.error('URL non-sécurisée détectée');
      setStatus('offline');
      return;
    }

    fetch(`${DISCORD_API_URL}/api/status`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(data => setStatus(data.status || 'offline'))
      .catch((error) => {
        console.error('Erreur de connexion Discord:', error);
        setStatus('offline');
      });

    const newSocket = io(DISCORD_API_URL, {
      timeout: 2000,
      forceNew: true
    });
    setSocket(newSocket);

    newSocket.on('chat message', (msg) => {
      if (typeof msg === 'object' && msg.content) {
        const sanitizedMsg = {
          ...msg,
          content: String(msg.content).slice(0, 500) // Limite de 500 caractères
        };
        setMessages(prev => [...prev, sanitizedMsg]);
      }
    });

    newSocket.on('statusUpdate', (newStatus) => {
      // Validation du statut
      const validStatuses = ['online', 'dnd', 'offline', 'idle'];
      if (validStatuses.includes(newStatus)) {
        setStatus(newStatus);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const toggleOpen = () => setIsOpen(open => !open);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    if (!canSend) {
      alert("Merci d'attendre 2 secondes avant d'envoyer un nouveau message.");
      return;
    }

    // Validation et sanitisation de l'input
    const sanitizedInput = input.trim().slice(0, 200); // Limite à 200 caractères
    const forbiddenPatterns = /<script|javascript:|data:/i;

    if (forbiddenPatterns.test(sanitizedInput)) {
      alert("Nop");
      return;
    }

    socket.emit('chat message', sanitizedInput);
    setMessages(prev => [...prev, { from: 'me', content: sanitizedInput }]);
    setInput('');
    setCanSend(false);

    setTimeout(() => {
      setCanSend(true);
    }, 2000);
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
            Tu m’envoies un message directement sur Discord. Si je ne réponds pas, n'hésitez pas à me laisser vos coordonnées. 👋
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
