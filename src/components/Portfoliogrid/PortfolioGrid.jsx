import React from 'react';
import './PortfolioGrid.scss';

const PortfolioGrid = () => {
  const items = [
    {
      img: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      link: 'https://github.com/lemoclock',
      alt: 'GitHub',
    },
    {
      img: 'https://get-picto.com/wp-content/uploads/2023/02/logo-linkedin-rond.webp',
      link: 'https://www.linkedin.com/in/benoit-l-b4003933b/',
      alt: 'LinkedIn',
    },
    {
      img: 'data:image/png;base64,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',
      link: '../../cv.png',
      alt: 'Mon CV',
    },
  ];

  return (
    <div className="portfolio-grid">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="grid-item"
        >
          <img src={item.img} alt={item.alt} />
        </a>
      ))}
    </div>
  );
};

export default PortfolioGrid;
