"use client";

import BackgroundGallery from "../Components/BackgroundGallery";
import HeroSection from "../Components/HeroSection";
import { footerData } from "./footerData";
import { useState } from "react";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [showLegalModal, setShowLegalModal] = useState(false);

  const openLegalModal = () => {
    setShowLegalModal(true);
  };

  const closeLegalModal = () => {
    setShowLegalModal(false);
  };

  return (
    <main>
      <HeroSection />

      {/* Footer intégré directement dans le canvas */}

      <div className="container">
        <h2>Découvre nos backgrounds</h2>
        <p>
          Explore notre collection de backgrounds interactifs et trouve celui
          qui correspond à ton projet. Clique sur un background pour voir plus
          de détails et obtenir le code.
        </p>
        <BackgroundGallery />

        {/* Footer intégré dans le canvas/container */}
        <div className="footer-container">
          <div className="footer-logo">
            <div className="logo-hexagon">
              <img src={footerData.initials} alt="Logo" />
            </div>
          </div>
          <div className="footer-links">
            <button className="link-button" onClick={openLegalModal}>
              Mentions légales
            </button>
            <span className="separator">|</span>
            <a
              href="mailto:chrstn.hmbrt67@outlook.com?subject=Proposition%20d'un%20nouveau%20background&body=Bonjour%2C%0A%0AJe%20souhaite%20proposer%20un%20nouveau%20background%20pour%20votre%20collection.%0A%0A---%20Informations%20sur%20le%20background%20---%0ANom%20du%20background%20%3A%0ADescription%20courte%20%3A%0ATechnologies%20utilis%C3%A9es%20%3A%0A%0A---%20Instructions%20---%0AMerci%20de%20joindre%20votre%20fichier%20JSX%20%C3%A0%20ce%20mail.%20Le%20fichier%20doit%20%C3%AAtre%20complet%20et%20fonctionnel.%0A%0ACordialement%2C"
              className="contact-link"
            >
              Proposer un background
            </a>
          </div>
          <p className="copyright">
            &copy; {currentYear} {footerData.copyright}
          </p>
        </div>
      </div>

      {/* Modale pour les mentions légales */}
      {showLegalModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeLegalModal}>
              ×
            </button>
            <h3>Mentions légales</h3>
            <div className="legal-text">
              <h4>Éditeur du site</h4>
              <p>{footerData.copyright}</p>

              <p>Email : chrstn.hmbrt67@outlook.com</p>

              <h4>Hébergement</h4>
              <p>GitHub</p>
              <p>Adresse : https://github.com/</p>

              <h4>Propriété intellectuelle</h4>
              <p>
                L'ensemble des éléments figurant sur ce site (textes, images,
                codes, etc.) sont protégés par les dispositions du Code de la
                Propriété Intellectuelle. Toute reproduction ou représentation,
                totale ou partielle, de ce site ou de l'un de ses éléments, est
                interdite sans l'autorisation expresse de son créateur.
              </p>

              <h4>Données personnelles</h4>
              <p>
                Conformément à la loi "Informatique et Libertés" du 6 janvier
                1978 modifiée et au Règlement Général sur la Protection des
                Données (RGPD), vous disposez d'un droit d'accès, de
                rectification et de suppression des données vous concernant.
                Pour exercer ce droit, veuillez nous contacter par email.
              </p>

              <h4>Cookies</h4>
              <p>
                Ce site n'utilise pas de cookies de traçage. Seuls des cookies
                techniques nécessaires au fonctionnement du site peuvent être
                déposés sur votre terminal.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #333;
          text-align: center;
        }

        p {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #555;
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem auto;
        }

        /* Styles du footer intégrés dans le canvas/container */
        .footer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 3rem;
          padding: 2rem 0;
          border-top: 1px solid #eaeaea;
        }

        .footer-logo {
          margin-bottom: 16px;
          display: flex;
          justify-content: center;
        }

        .logo-hexagon {
          width: 80px;
          height: 80px;
          background-color: var(--primary-color);
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .logo-hexagon img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .footer-links {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .link-button {
          background: none;
          border: none;
          color: var(--primary-color, #0066cc);
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0;
          text-decoration: underline;
        }

        .link-button:hover {
          color: #004499;
        }

        .contact-link {
          color: var(--primary-color, #0066cc);
          text-decoration: underline;
          font-size: 0.9rem;
          position: relative;
        }

        .contact-link:hover {
          color: #004499;
        }

        .contact-link:hover::after {
          content: "Envoyer un email avec votre fichier JSX";
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.8rem;
          white-space: nowrap;
          z-index: 100;
        }

        .separator {
          margin: 0 10px;
          color: #777;
        }

        .copyright {
          font-size: 0.9rem;
          color: #555;
          text-align: center;
        }

        /* Styles pour la modale */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 800px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1.5rem;
          font-size: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
        }

        .close-button:hover {
          color: var(--primary-color, #0066cc);
        }

        .legal-text h4 {
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          color: #333;
        }

        .legal-text p {
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 0.5rem;
          text-align: left;
        }

        @media (max-width: 768px) {
          .logo-hexagon {
            width: 60px;
            height: 60px;
          }
        }

        @media (max-width: 480px) {
          .logo-hexagon {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </main>
  );
}
