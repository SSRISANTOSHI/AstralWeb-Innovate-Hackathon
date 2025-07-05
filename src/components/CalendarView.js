import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./CalendarView.css";
import { useTranslation } from "react-i18next";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchEvents(selectedDate);
  }, [selectedDate]);

  const fetchEvents = (date) => {
    const formatted = date.toISOString().split("T")[0];
    axios
      .get(`http://localhost:5000/api/events/by-date?date=${formatted}`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error loading calendar events:", err));
  };

  return (
    <div className="calendar-view">
      <h3>📅 {t("calendar")} - Pick a Date</h3>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
      />
      <div className="calendar-events">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="calendar-card">
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              <a href={event.source} target="_blank" rel="noopener noreferrer">Source</a>
            </div>
          ))
        ) : (
          <p>No space events recorded for this date.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
