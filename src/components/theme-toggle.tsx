import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "./theme-toggle.css";

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <div className="theme-toggle-container">
      <label className="theme-toggle-switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={onToggle}
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        />
        <span className="theme-toggle-slider">
          <FontAwesomeIcon icon={faSun} className="icon-sun" />
          <FontAwesomeIcon icon={faMoon} className="icon-moon" />
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
