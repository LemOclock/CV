import React from "react";
import PortfolioGrid from "./components/Portfoliogrid/PortfolioGrid";
import TechLogos from './components/TechLogos/TechLogos';
import ContactButton from "./components/ContactButton/ContactButton";
import IntroSection from "./components/IntroSection/IntroSection";
import SectionProjet from "./components/SectionProjet/SectionProjet";
import DiscordChatBox from './components/DiscordChatBox/DiscordChatBox';
import './styles/main.scss';


function App() {
  return (
    <div className="page-container">
      <header className="header-section">
        <IntroSection />
        <div className="header-actions">
          <ContactButton />
          <DiscordChatBox />
        </div>
      </header>

      <main className="main-layout">
        <section className="content-box project-section">
          <SectionProjet />
        </section>

        <section className="content-row">
          <div className="content-box portfolio-section">
            <PortfolioGrid />
          </div>
          <div className="content-box tech-section">
            <TechLogos />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
