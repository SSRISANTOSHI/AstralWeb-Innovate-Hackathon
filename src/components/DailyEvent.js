import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizPopup from "./QuizPopup";
import "./DailyEvent.css";
import { useTranslation } from "react-i18next";

const DailyEvent = () => {
  const [events, setEvents] = useState([]);
  const [apodEvent, setApodEvent] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() =>
    JSON.parse(localStorage.getItem("bookmarkedEvents")) || []
  );
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get("http://localhost:5000/api/events/daily")
      .then(res => {
        const data = res.data;
        const apod = data.find(event => event.source.includes("nasa.gov"));
        const others = data.filter(event => !event.source.includes("nasa.gov"));
        setApodEvent(apod);
        setEvents(others);
      })
      .catch(err => console.error("Error fetching daily events:", err));
  }, []);

  const toggleBookmark = (id) => {
    let updated = [...bookmarkedIds];
    if (updated.includes(id)) {
      updated = updated.filter(item => item !== id);
    } else {
      updated.push(id);
    }
    setBookmarkedIds(updated);
    localStorage.setItem("bookmarkedEvents", JSON.stringify(updated));
  };

  const openQuiz = (event) => {
    const year = event.date.split("-")[0];
    const options = [
      year,
      String(parseInt(year) - 5),
      String(parseInt(year) + 3),
      "I don't know"
    ];
    setQuizData({
      question: `What year did this event occur?`,
      options,
      correctAnswer: year
    });
    setQuizOpen(true);
  };

  return (
    <div className="daily-event">
      <h3>🗓️ {t("todayInSpace")}</h3>

      {/* NASA APOD card */}
      {apodEvent && (
        <div className="event-card nasa-apod">
          <h4>🚀 {apodEvent.title}</h4>
          <img
            src={apodEvent.source}
            alt={apodEvent.title}
            className="apod-image"
          />
          <p>{apodEvent.description}</p>
          <a href={apodEvent.source} target="_blank" rel="noopener noreferrer">
            View Full Image
          </a>
          <div className="event-buttons">
            <button onClick={() => toggleBookmark(apodEvent.id)}>
              {bookmarkedIds.includes(apodEvent.id) ? "★ Bookmarked" : "☆ Bookmark"}
            </button>
          </div>
        </div>
      )}

      {/* Other space events */}
      {events.length > 0 ? (
        events.map(event => (
          <div className="event-card" key={event.id}>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
            <a href={event.source} target="_blank" rel="noopener noreferrer">Read more</a>
            <div className="event-buttons">
              <button onClick={() => toggleBookmark(event.id)}>
                {bookmarkedIds.includes(event.id) ? "★ Bookmarked" : "☆ Bookmark"}
              </button>
              <button onClick={() => openQuiz(event)}>🧠 {t("takeQuiz")}</button>
            </div>
          </div>
        ))
      ) : (
        <p>No historical events found for today.</p>
      )}

      {quizOpen && quizData && (
        <QuizPopup
          question={quizData.question}
          options={quizData.options}
          correctAnswer={quizData.correctAnswer}
          onClose={() => setQuizOpen(false)}
        />
      )}
    </div>
  );
};

export default DailyEvent;
