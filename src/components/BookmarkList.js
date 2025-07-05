import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookmarkList.css";
import { useTranslation } from "react-i18next";

const BookmarkList = () => {
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const bookmarkedIds = JSON.parse(localStorage.getItem("bookmarkedEvents")) || [];
  const { t } = useTranslation();

  useEffect(() => {
    if (bookmarkedIds.length === 0) return;

    axios.get("http://localhost:5000/api/events/daily")
      .then(res => {
        const matches = res.data.filter(event => bookmarkedIds.includes(event.id));
        setBookmarkedEvents(matches);
      })
      .catch(err => console.error("Error loading bookmarks:", err));
  }, [bookmarkedIds]);

  return (
    <div className="bookmark-list">
      <h3>⭐ {t("bookmarks")}</h3>
      {bookmarkedEvents.length > 0 ? (
        bookmarkedEvents.map(event => (
          <div key={event.id} className="bookmark-card">
            <h4>{event.title}</h4>
            <p>{event.description}</p>
            <a href={event.source} target="_blank" rel="noopener noreferrer">Source</a>
          </div>
        ))
      ) : (
        <p>You haven’t bookmarked any events yet.</p>
      )}
    </div>
  );
};

export default BookmarkList;
