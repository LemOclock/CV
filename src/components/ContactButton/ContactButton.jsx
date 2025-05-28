import React from 'react';
import './ContactButton.scss';

export default function ContactButton() {
  return (
    <div className="contact-button">
      {/* Icône mail SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="none"
        stroke="#4338ca"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        className="contact-icon"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <polyline points="22,6 12,13 2,6" />
      </svg>

      {/* Tooltip déroulant */}
      <a
        href="mailto:benoitoclock1@gmail.com"
        className="contact-tooltip"
        onClick={(e) => e.stopPropagation()}
      >
        Contactez moi par mail
      </a>
    </div>
  );
}
