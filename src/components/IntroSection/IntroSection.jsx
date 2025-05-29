import React from 'react';
import './IntroSection.scss';

export default function IntroSection() {
  return (
    <section className="intro-section">
      <img
        src="https://i.imgur.com/Hh5kbsF.png"
        alt="Portrait de Benoit Oclock"
        className="intro-image"
      />
      <div className="intro-text">
        <h1>Benoit Oclock</h1>
        <p>Développeur Fullstack Junior</p>
        <p>On arrête jamais d'apprendre !</p>
        <p>
          Pour faire suite à ma formation de Développeur web et accessibilité à
          l'école O'clock je suis à la recherche d'un stage.
        </p>
      </div>
    </section>
  );
}
