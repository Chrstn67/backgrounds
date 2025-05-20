"use client";

import ParticlesBackground from "./ParticlesBackground";
import "../Styles/HeroSection.css";

export default function HeroSection() {
  return (
    <div className="hero-container">
      <div className="background-wrapper">
        <ParticlesBackground />
      </div>
      <div className="content">
        <h1>Galerie de Backgrounds</h1>
        <p>
          Trouve le background parfait pour ton site web. Prévisualise et copie
          le code en un seul clic.
        </p>
        <p>Tu as aussi la possibilité d'en proposer !</p>
        <button
          onClick={() =>
            document
              .querySelector(".gallery")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Explorer
        </button>
      </div>
    </div>
  );
}
