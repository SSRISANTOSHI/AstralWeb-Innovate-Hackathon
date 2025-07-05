import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select onChange={handleChange} value={i18n.language}>
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
    </select>
  );
};

export default LanguageToggle;
