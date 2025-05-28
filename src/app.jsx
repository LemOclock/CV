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
      <IntroSection />
      <ContactButton />
<DiscordChatBox />
      <div className="main-layout">
        <div className="content-row">
          <div className="content-box">
            <PortfolioGrid />
          </div>
          <div className="content-box">
            <TechLogos />
          </div>
        </div>

        <div className="content-box">
          <SectionProjet />
        </div>
      </div>
    </div>
  );
}

export default App;
