import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import "./Navbar.css";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>🚀 Cosmic Chronicles</h1>
      </div>

      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/timeline">Timeline</Link>
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="navbar-right">
        <LanguageToggle />
        <button onClick={toggleTheme} className="mode-toggle">
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

