import React, { useState, useEffect } from "react";
import "./SectionProjet.scss";

const projects = [
  {
    title: "Projet 1",
    imageUrl: "https://i.imgur.com/u7PqwxR.png",
  },
  {
    title: "Projet 2",
    imageUrl: "https://via.placeholder.com/600x400?text=Projet+2",
  },
  {
    title: "Projet 3",
    imageUrl: "https://via.placeholder.com/600x400?text=Projet+3",
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

  const { title, imageUrl } = projects[currentIndex];

  return (
    <section className="section-projet-container" aria-label={`Projet courant : ${title}`}>
      <div className={`project-card ${fade ? "fade-in" : "fade-out"}`}>
        <img src={imageUrl} alt={`Image du ${title}`} className="project-image" />
        <h2 className="project-title">{title}</h2>
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
