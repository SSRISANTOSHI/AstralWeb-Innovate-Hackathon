import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NasaImage.css";
import { useTranslation } from "react-i18next";

const NasaImage = () => {
  const [apod, setApod] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get("http://localhost:5000/api/nasa/apod")
      .then(res => setApod(res.data))
      .catch(err => console.error("Error fetching NASA APOD:", err));
  }, []);

  if (!apod) return null;

  return (
    <div className="nasa-image">
      <h3>🖼️ {t("apod")}</h3>
      {apod.media_type === "image" ? (
        <img src={apod.url} alt={apod.title} />
      ) : (
        <iframe src={apod.url} title="NASA Video" width="100%" height="300" />
      )}
      <p><strong>{apod.title}</strong></p>
      <p>{apod.explanation}</p>
    </div>
  );
};

export default NasaImage;
