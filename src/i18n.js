import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import TranslationAr from "./Translation/TransilationAr.json";
import TranslationEn from "./Translation/TransilationEn.json";

const resources = {
  english: {
    translation: TranslationEn,
  },
  arabic: {
    translation: TranslationAr,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "arabic",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
  if (lng === "arabic") {
    document.documentElement.setAttribute("dir", lng);
    document.body.style.direction = "rtl";
  } else {
    document.body.style.direction = "ltr";
  }
});
localStorage.setItem("lng", "arabic")

export default i18n;
