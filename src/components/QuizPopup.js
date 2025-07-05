import React, { useState } from "react";
import "./QuizPopup.css";
import { useTranslation } from "react-i18next";

const QuizPopup = ({ question, options, correctAnswer, onClose }) => {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const { t } = useTranslation();

  const handleSelect = (option) => {
    setSelected(option);
    setFeedback(option === correctAnswer ? "✅ Correct!" : "❌ Incorrect. Try again!");
  };

  return (
    <div className="quiz-overlay">
      <div className="quiz-box">
        <h3>🧠 Quiz</h3>
        <p>{question}</p>
        <div className="quiz-options">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className={selected === option ? "selected" : ""}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && <p className="quiz-feedback">{feedback}</p>}
        <button className="close-btn" onClick={onClose}>{t("close")}</button>
      </div>
    </div>
  );
};

export default QuizPopup;
