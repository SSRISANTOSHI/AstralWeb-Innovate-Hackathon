import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TimelineView.css";
import { useTranslation } from "react-i18next";

const TimelineView = () => {
  const [events, setEvents] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events/timeline")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Timeline error:", err));
  }, []);

  return (
    <div className="timeline-view">
      <h3>🕰️ {t("timeline")}</h3>
      <div className="timeline">
        {events.map((event) => (
          <div className="timeline-item" key={event.id}>
            <div className="timeline-date">{event.date}</div>
            <div className="timeline-content">
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              <a href={event.source} target="_blank" rel="noopener noreferrer">Source</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineView;
