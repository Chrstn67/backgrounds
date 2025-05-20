"use client"

import ParticlesBackground from "./ParticlesBackground"
import "../Styles/HeroSection.css"

export default function HeroSection() {
  return (
    <div className="hero-container">
      <div className="background-wrapper">
        <ParticlesBackground />
      </div>
      <div className="content">
        <h1>Galerie de Backgrounds</h1>
        <p>Trouvez le background parfait pour votre site web. Prévisualisez et copiez le code en un seul clic.</p>
        <button onClick={() => document.querySelector(".gallery").scrollIntoView({ behavior: "smooth" })}>
          Explorer
        </button>
      </div>
    </div>
  )
}
