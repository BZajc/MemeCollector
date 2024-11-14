import { useState } from "react";
import polandFlag from "../icons/poland-flag.svg";
import usaFlag from "../icons/usa-flag.svg";
import { useNavigate } from "react-router-dom";

function InfoPage() {
  const [language, setLanguage] = useState<"en" | "pl">("en");
    const navigate = useNavigate()

    const goBack = () => {
        navigate("/")
    }

  // Text content object for both languages
  const texts = {
    en: {
      header1: "About the Project",
      text1:
        "This project is a simple web-based 'game' focused on demonstrating the use of React in building interactive applications rather than a full-fledged game.",
      text2:
        "The goal of the 'game' is to collect all the available cards, which can be accessed in the 'Collection' tab.",
      text3:
        "Card packs are purchased with currency, which is earned by clicking on the screen in the 'Home' tab.",
      text4:
        "The aim was to keep the game concise and focused on implementing functional, connected components, rather than expanding its content.",
      header2: "Technical Aspects",
      text5: "The game is built with React, Redux, TypeScript, and Firebase.",
      text6: "All the documentation and code can be found on my GitHub:",
      text7: "https://github.com/BZajc/MemeCollector",
      header3: "Acknowledgments",
      text8:
        "Special thanks to Vince Desi and Mike Jaret for supporting this project and granting the license to use the song 'Christian-Salyer-Habib's Lucky Ganesh-All American Market' from the game POSTAL® 2.",
      text9:
        "© Running With Scissors Studios LLC, 1996-2024. All Rights Reserved.",
      text10:
        "POSTAL® and Running With Scissors® are Registered Trademarks and Service Marks of Running With Scissors Studios LLC.",
    },
    pl: {
      header1: "O Projekcie",
      text1:
        "Ten projekt to prosta 'gra' internetowa skupiająca się na wykorzystaniu React do budowania interaktywnych aplikacji, a nie pełnoprawna gra.",
      text2:
        "Celem 'gry' jest zebranie wszystkich dostępnych kart, które można zobaczyć w zakładce 'Kolekcja'.",
      text3:
        "Paczki kart można kupić za walutę, którą zdobywa się poprzez klikanie ekranu w zakładce 'Home'.",
      text4:
        "Celem było utrzymanie gry w prostej formie i skupienie się na implementacji funkcjonalnych, powiązanych komponentów, a nie na rozbudowie zawartości.",
      header2: "Aspekty Techniczne",
      text5:
        "'Gra' została zbudowana przy użyciu technologii React, Redux, TypeScript oraz Firebase.",
      text6: "Cała dokumentacja i kod dostępne są na moim GitHubie:",
      text7: "https://github.com/BZajc/MemeCollector",
      header3: "Podziękowania",
      text8:
        "Szczególne podziękowania dla Vince'a Desi i Mike'a Jareta za wsparcie tego projektu i udostępnienie licencji na użycie utworu 'Christian-Salyer-Habib's Lucky Ganesh-All American Market' z gry POSTAL® 2.",
      text9:
        "© Running With Scissors Studios LLC, 1996-2024. Wszelkie Prawa Zastrzeżone.",
      text10:
        "POSTAL® i Running With Scissors® to Zarejestrowane Znaki Towarowe i Usługowe Running With Scissors Studios LLC.",
    },
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "pl" : "en"));
  };

  // Retrieve content based on the selected language
  const content = texts[language];

  return (
    <div className="info-page">
      <div className="info-page__wrapper">
        <h2 className="info-page__h2">Information</h2>
        <div className="info-page__section-container">
          {/* Button to toggle language with flag icons */}
          <button className="info-page__button" onClick={toggleLanguage}>
            {language === "en" ? "Zmień na Polski:" : "Switch to English:"}
            <img
              src={language === "en" ? polandFlag : usaFlag}
              alt={language === "en" ? "Switch to Polish" : "Switch to English"}
              className="info-page__flag-icon"
            />
          </button>
          <div className="info-page__section">
            <h3 className="info-page__section-header">{content.header1}</h3>
            <p className="info-page__text info-page__text--1">
              {content.text1}
            </p>
            <p className="info-page__text info-page__text--2">
              {content.text2}
            </p>
            <p className="info-page__text info-page__text--3">
              {content.text3}
            </p>
            <p className="info-page__text info-page__text--4">
              {content.text4}
            </p>
          </div>
          <div className="info-page__section">
            <h3 className="info-page__section-header">{content.header2}</h3>
            <p className="info-page__text info-page__text--5">
              {content.text5}
            </p>
            <p className="info-page__text info-page__text--6">
              {content.text6}
            </p>
            <a
              href="https://github.com/BZajc/MemeCollector"
              className="info-page__text info-page__text--7"
            >
              {content.text7}
            </a>
          </div>
          <div className="info-page__section">
            <h3 className="info-page__section-header">{content.header3}</h3>
            <p className="info-page__text info-page__text--8">
              {content.text8}
            </p>
            <p className="info-page__text info-page__text--9">
              {content.text9}
            </p>
            <p className="info-page__text info-page__text--10">
              {content.text10}
            </p>
            <button className="info-page__button info-page__button--go-back" onClick={goBack}>Go back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
