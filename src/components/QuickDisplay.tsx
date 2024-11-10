import { GiCardExchange, GiCutDiamond } from "react-icons/gi";
import { useSelector } from "react-redux";
import {
  selectBlackJack,
  selectWheelOfMeme,
} from "../store/slices/clickerSlice";
import { useState } from "react";

function QuickDisplay() {
  const blackJack = useSelector(selectBlackJack);
  const wheelOfMeme = useSelector(selectWheelOfMeme);
  const [showPopup, setShowPopup] = useState<string>("");

  const handleSpecialClick = (type: string) => {
    setShowPopup(type);
  };

  const handleClosePopup = () => {
    setShowPopup("");
  };

  const renderPopup = (
    title: string,
    isPurchased: boolean,
    description: string
  ) => (
    <div className="display-special__popup" onClick={handleClosePopup}>
      <div
        className="display-special__popup-container"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the popup
      >
        <div className="display-special__popup-title">{title}</div>
        <div
          className={`display-special__popup-description ${
            !isPurchased ? "display-special__not-bought" : ""
          }`}
        >
          {/* Inform if improvement is not purchased */}
          {isPurchased
            ? description
            : `You have to buy the ${title} upgrade first in order to play it.`}
        </div>
        <div className="display-special__popup-buttons-box">
          {!isPurchased && (
            <button className="display-special__popup-button display-special__popup-button--upgrade">
              Go To Upgrade Section
            </button>
          )}
          {/* Hide open and close buttons if improvement is not purchased */}
          {isPurchased && (
            <>
              <button className="display-special__popup-button display-special__popup-button--open">
                {title}
              </button>
              <button
                className="display-special__popup-button display-special__popup-button--close"
                onClick={handleClosePopup}
              >
                No way
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="display-special">
      <button
        className="display-special__button"
        onClick={() => handleSpecialClick("wheelofmeme")}
      >
        <GiCutDiamond className="display-special__icon" />
      </button>
      <button
        className="display-special__button"
        onClick={() => handleSpecialClick("blackjack")}
      >
        <GiCardExchange className="display-special__icon" />
      </button>

      {showPopup === "blackjack" &&
        renderPopup(
          "BLACK JACK",
          blackJack,
          "Try your luck in this classic game of Blackjack! Get as close to 21 as possible without going over. Beat the dealer and win big!"
        )}
      {showPopup === "wheelofmeme" &&
        renderPopup(
          "WHEEL OF MEME",
          wheelOfMeme,
          "A spin brings you closer to the ultimate meme! Whether it's iconic or obscure, every turn holds a new surprise prize."
        )}
    </div>
  );
}

export default QuickDisplay;
