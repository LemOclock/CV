import React, { useState, useEffect } from "react";
import "./SectionProjet.scss";

const projects = [
  {
    title: "Projet de fin de formation - En développement continu",
    description: "Projet toujours en cours et pas entièrement à jour, mais déjà en ligne avec des fonctionnalités partiellement opérationnelles",
    imageUrl: "https://i.imgur.com/Iw0pOwn.png",
    link: "https://lapinceisfront.vercel.app/",
    linkText: "Découvrir le projet"
  },
  {
    title: "Portfolio",
    imageUrl: "https://i.imgur.com/u7PqwxR.png",
    link: "https://cv-nu-lilac.vercel.app/",
    linkText: "Voir le portfolio"
  },

  {
    title: "Mon prochain projet c'est avec vous ! ;) ",
    imageUrl: "https://i.imgur.com/PuvglgE.gif",
  },
];

export default function SectionProjet() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 100);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const { title, imageUrl, link, linkText, description } = projects[currentIndex];

  return (
    <section className="section-projet-container" aria-label={`Projet courant : ${title}`}>
      <div className={`project-card ${fade ? "fade-in" : "fade-out"}`}>
        <img src={imageUrl} alt={`Image du ${title}`} className="project-image" />
        <h2 className="project-title">{title}</h2>
        {description && (
          <p className="project-description">{description}</p>
        )}
        {link && linkText && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            {linkText}
          </a>
        )}
        <p className="project-index">{currentIndex + 1} / {projects.length}</p>

        <div
          className="btn-next"
          role="button"
          tabIndex={0}
          onClick={handleNext}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleNext();
            }
          }}
          aria-label="Projet suivant"
        >
          <div className="btn-circle-spin"></div>
          <div className="btn-arrow-up"></div>
        </div>
      </div>
    </section>
  );
}
