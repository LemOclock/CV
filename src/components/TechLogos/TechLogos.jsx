import React, { useState } from 'react';
import './TechLogos.scss';

const logos = {
  front: [
    { name: 'JavaScript', src: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' },
    { name: 'React', src: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png' },
    { name: 'EJS', src: 'https://img.icons8.com/color/512/ejs.png' },
    { name: 'CSS', src: 'https://cdn-icons-png.flaticon.com/512/732/732190.png' },
    { name: 'HTML', src: 'https://cdn-icons-png.flaticon.com/512/732/732212.png' },
    { name: 'SCSS', src: 'https://cdn.worldvectorlogo.com/logos/sass-1.svg' },
  ],
  back: [
    { name: 'Node.js', src: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
    { name: 'Express', src: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png' },
  ],
  bdd: [
    { name: 'PostgreSQL', src: 'https://cdn-icons-png.flaticon.com/512/5968/5968342.png' },
    { name: 'MongoDB', src: 'https://cdn-icons-png.flaticon.com/512/919/919836.png' },
  ],
};

const categories = ['front', 'back', 'bdd'];

export default function TechLogos() {
  const [selected, setSelected] = useState('front');

  const nextCategory = () => {
    const currentIndex = categories.indexOf(selected);
    const nextIndex = (currentIndex + 1) % categories.length;
    setSelected(categories[nextIndex]);
  };

  return (
    <div className="tech-logos-container">
      <h2 className="tech-logos-title">{selected.toUpperCase()}</h2>

      <div
        className="tech-logos-grid"
        onClick={nextCategory}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextCategory();
          }
        }}
        aria-label={`Changer catégorie, catégorie actuelle: ${selected}`}
        title="Cliquer ou appuyer pour changer la catégorie"
      >
        {logos[selected].map(({ name, src }) => (
          <div key={name} className="tech-logo-item" title={name}>
            <img src={src} alt={name} className="tech-logo-image" />
          </div>
        ))}

        <div className="tech-logos-arrow" aria-hidden="true">
          <div className="spinner" />
          <div className="arrow-up" />
        </div>
      </div>
    </div>
  );
}
