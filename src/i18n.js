import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          welcome: "Welcome to Cosmic Chronicles",
          todayInSpace: "Today in Space History",
          apod: "NASA's Astronomy Picture of the Day",
          bookmarks: "Bookmarks",
          about: "About",
          calendar: "Calendar",
          timeline: "Timeline",
          takeQuiz: "Take Quiz",
          close: "Close",
        },
      },
      hi: {
        translation: {
          welcome: "कॉस्मिक क्रॉनिकल्स में आपका स्वागत है",
          todayInSpace: "आज के खगोल विज्ञान इतिहास",
          apod: "नासा की आज की खगोलीय तस्वीर",
          bookmarks: "बुकमार्क",
          about: "परिचय",
          calendar: "कैलेंडर",
          timeline: "समयरेखा",
          takeQuiz: "प्रश्नोत्तरी लें",
          close: "बंद करें",
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

