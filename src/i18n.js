// src/i18n.js
import { createI18n } from "vue-i18n";

const messages = {
  fr: {
    // NAV
    home: "Accueil",
    about: "À propos",
    alphabet: "Alphabet",
    expressions: "Expressions",
    declensions: "declensions",
    // SLOGAN
    furansugo: "Furansugo",
    slogan: "Apprendre en s'amusant",
    // EXPRESSIONS PAGE
    dataError: "Aucune donnée pour ce thème",
    greetings: "Salutations",
    food: "Nourriture",
    sports: "Sports",
    arts: "Arts",
  },
  ru:
  {
      // NAV
    home: "домашняя",
    about: "",
    alphabet: "",
    expressions: "выражение",
    // SLOGAN
    furansugo: "",
    slogan: "",
    // EXPRESSIONS PAGE
    dataError: "",
    greetings: "",
    food: "",
    sports: "",
    arts: "",
  }
}

const i18n = createI18n({
  legacy: false, // Composition API
  locale: localStorage.getItem("lang") || "fr",
  fallbackLocale: "fr",
  messages,
});

export default i18n;
