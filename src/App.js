import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import BookmarkList from "./components/BookmarkList";
import CalendarView from "./components/CalendarView";
import TimelineView from "./components/TimelineView";
import Navbar from "./components/Navbar";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/bookmarks" element={<BookmarkList />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/timeline" element={<TimelineView />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
