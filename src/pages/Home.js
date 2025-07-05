import React from "react";
import "./Home.css";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <h1 className="home-title">🚀 {t("welcome")}</h1>
      <p className="home-subtitle">{t("todayInSpace")}</p>

      <div className="history-card">
        <h3>🗓️ {t("todayInSpace")}</h3>
        <p>No historical events found for today.</p> {/* Replace with API-driven content */}
      </div>
    </div>
  );
};

export default Home;

