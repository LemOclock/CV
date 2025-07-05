import React from 'react';
import './ContactButton.scss';

export default function ContactButton() {
  const handleMailClick = () => {
    // Méthode principale
    try {
      window.location.href = 'mailto:benoitoclock1@gmail.com';
    } catch (error) {
      // Méthode alternative si la première échoue
      const link = document.createElement('a');
      link.href = 'mailto:benoitoclock1@gmail.com';
      link.click();
    }
  };

  return (
    <div className="contact-button" onClick={handleMailClick}>
      {/* Icône mail SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        fill="none"
        stroke="#4338ca"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        className="contact-icon"
        style={{
          width: 'clamp(30px, 4vw, 45px)',
          height: 'clamp(30px, 4vw, 45px)'
        }}
      >
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    </div>
  );
}
