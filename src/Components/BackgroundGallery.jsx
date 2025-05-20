"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundPreview from "./BackgroundPreview";
import "../Styles/BackgroundGallery.css";

const backgrounds = [
  {
    id: "particles",
    name: "Particules Connectées",
    description:
      "Un fond avec des particules interactives qui se connectent quand elles sont proches.",
    theme: "Science",
    thumbnail: "/thumbnails/particles.png",
  },
  {
    id: "gradientWaves",
    name: "Vagues Gradient",
    description:
      "Animation fluide de vagues colorées qui se déplacent en douceur.",
    theme: "Créatif",
    thumbnail: "/thumbnails/gradient-waves.png",
  },
  {
    id: "matrixRain",
    name: "Matrix Rain",
    description: "Animation de style 'pluie de code' inspirée du film Matrix.",
    theme: "Informatique",
    thumbnail: "/thumbnails/matrix.png",
  },
  {
    id: "bubbles",
    name: "Bulles Flottantes",
    description: "Des bulles colorées qui flottent lentement à l'écran.",
    theme: "Ludique",
    thumbnail: "/thumbnails/bubbles.png",
  },
  {
    id: "stars",
    name: "Ciel Étoilé",
    description: "Un ciel nocturne avec des étoiles qui scintillent.",
    theme: "Science",
    thumbnail: "/thumbnails/stars.png",
  },
  {
    id: "geometric",
    name: "Motifs Géométriques",
    description:
      "Formes géométriques animées qui forment des motifs complexes.",
    theme: "Maths",
    thumbnail: "/thumbnails/geometric.png",
  },
  {
    id: "falling",
    name: "Motifs Confetti",
    description: "Des confetti tombent poétiquement sur l'écran.",
    theme: "Ludique",
    thumbnail: "/thumbnails/falling.png",
  },
];

export default function BackgroundGallery() {
  const [filter, setFilter] = useState("all");

  // Extract unique themes from the backgrounds data
  const themes = ["all", ...new Set(backgrounds.map((bg) => bg.theme))];

  const filteredBackgrounds =
    filter === "all"
      ? backgrounds
      : backgrounds.filter((bg) => bg.theme === filter);

  return (
    <div className="gallery">
      <div className="filters">
        {themes.map((theme) => (
          <button
            key={theme}
            className={filter === theme ? "active" : ""}
            onClick={() => setFilter(theme)}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid">
        {filteredBackgrounds.map((background) => (
          <Link to={`/backgrounds/${background.id}`} key={background.id}>
            <div className="card">
              <div className="thumbnail">
                <BackgroundPreview id={background.id} />
              </div>
              <div className="info">
                <h3>{background.name}</h3>
                <p>{background.description}</p>
                <span className="theme">{background.theme}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
