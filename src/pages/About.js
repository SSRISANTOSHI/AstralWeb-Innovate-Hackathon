import React from "react";
import "./About.css";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-container">
      <div className="about-card">
        <h2>🌌 {t("aboutTitle") || "Cosmic Chronicles"}</h2>
        <p>
          Cosmic Chronicles is a space-themed web application that brings you closer to the universe by showcasing major historical astronomical events and stunning images from space.
        </p>
        <p>
          The project pulls data from sources like <strong>NASA’s APOD API</strong> and <strong>Wikipedia</strong> to present facts, photos, and trivia about the cosmos.
        </p>
        <h3>✨ Features</h3>
        <ul>
          <li>Daily space events from history</li>
          <li>NASA's Astronomy Picture of the Day</li>
          <li>Quiz & Trivia</li>
          <li>Calendar and timeline views</li>
          <li>Bookmark your favorite space events</li>
          <li>Multilingual and dark mode support</li>
        </ul>
        <p>
          Built with React, Flask, MySQL, and public space APIs. Ideal for students, educators, and space lovers.
        </p>
      </div>
    </div>
  );
};

export default About;
