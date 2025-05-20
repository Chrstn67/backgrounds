import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BackgroundPreview from "../Components/BackgroundPreview";
import { backgrounds } from "./data";

import "../Styles/BackgroundDetails.css";

export default function BackgroundDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState({ jsx: false, css: false });
  const [activeTab, setActiveTab] = useState("jsx");
  const [viewMode, setViewMode] = useState("split"); // split, preview, code
  const [showCodeOverlay, setShowCodeOverlay] = useState(false);
  const { id } = params;

  const background = backgrounds[id];

  useEffect(() => {
    if (!background) {
      navigate("/");
    }
  }, [background, navigate]);

  // Effet pour gérer l'overflow du body lors de l'ouverture/fermeture de l'overlay
  useEffect(() => {
    // Désactiver le scroll uniquement lorsque l'overlay est ouvert
    document.body.style.overflow = showCodeOverlay ? "hidden" : "auto";

    // Nettoyage lors du démontage du composant
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCodeOverlay]);

  if (!background) {
    return null;
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [type]: true });
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
    });
  };

  const toggleViewMode = () => {
    if (viewMode === "split") {
      setViewMode("preview");
    } else if (viewMode === "preview") {
      setViewMode("code");
    } else {
      setViewMode("split");
    }
  };

  const getViewModeClass = () => {
    if (viewMode === "preview") return "preview-expanded";
    if (viewMode === "code") return "code-expanded";
    return "";
  };

  const openCodeOverlay = () => {
    setShowCodeOverlay(true);
    // La gestion du overflow est maintenant dans l'useEffect
  };

  const closeCodeOverlay = () => {
    setShowCodeOverlay(false);
    // La gestion du overflow est maintenant dans l'useEffect
  };

  return (
    <div className="background-detail">
      <div className="header">
        <Link to="/" className="back-button">
          ← Retour à la galerie
        </Link>
        <h1>{background.name}</h1>
      </div>

      <div className={`split-view ${getViewModeClass()}`}>
        {/* Section de prévisualisation */}
        <div className="preview-section">
          <div className="preview-container">
            <BackgroundPreview id={id} />
          </div>
          <div className="preview-info animate-in">
            <h2>Description</h2>
            <p>{background.description}</p>
          </div>
          <button
            className="expand-button"
            onClick={() =>
              setViewMode(viewMode === "preview" ? "split" : "preview")
            }
            aria-label={
              viewMode === "preview" ? "Réduire l'aperçu" : "Agrandir l'aperçu"
            }
          >
            {viewMode === "preview" ? "↙" : "↗"}
          </button>
        </div>

        {/* Section de code */}
        <div className="code-section">
          <div className="code-tabs">
            <button
              className={`code-tab ${activeTab === "jsx" ? "active" : ""}`}
              onClick={() => setActiveTab("jsx")}
            >
              JSX
            </button>
            <button
              className={`code-tab ${activeTab === "css" ? "active" : ""}`}
              onClick={() => setActiveTab("css")}
            >
              CSS
            </button>
          </div>

          <div className="code-content">
            <div className="code-block animate-in">
              <div className="code-header">
                <h3>{activeTab === "jsx" ? "JSX Component" : "CSS Styles"}</h3>
                <div className="code-actions">
                  <button
                    className={`code-action-button ${
                      copied[activeTab] ? "copied" : "copy"
                    }`}
                    onClick={() =>
                      copyToClipboard(
                        activeTab === "jsx" ? background.code : background.css,
                        activeTab
                      )
                    }
                  >
                    {copied[activeTab] ? "✓ Copié" : "Copier"}
                  </button>
                  <button
                    className="code-action-button"
                    onClick={openCodeOverlay}
                  >
                    Plein écran
                  </button>
                </div>
              </div>
              <pre className="code">
                {activeTab === "jsx" ? background.code : background.css}
              </pre>
            </div>
          </div>

          <button
            className="expand-button"
            onClick={() => setViewMode(viewMode === "code" ? "split" : "code")}
            aria-label={
              viewMode === "code" ? "Réduire le code" : "Agrandir le code"
            }
          >
            {viewMode === "code" ? "↙" : "↗"}
          </button>
        </div>

        {/* Bouton de bascule de vue */}
        {viewMode === "split" && (
          <button
            className="toggle-view"
            onClick={toggleViewMode}
            aria-label="Changer de vue"
          >
            ⇄
          </button>
        )}
      </div>

      {/* Overlay pour le code en plein écran */}
      <div className={`code-overlay ${showCodeOverlay ? "open" : ""}`}>
        <div className="overlay-header">
          <h2>{activeTab === "jsx" ? "JSX Component" : "CSS Styles"}</h2>
          <button
            className="close-overlay"
            onClick={closeCodeOverlay}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
        <div className="overlay-content">
          <pre className="overlay-code">
            {activeTab === "jsx" ? background.code : background.css}
          </pre>
        </div>
      </div>
    </div>
  );
}
