import { Card } from "../data/cardsConfig";
import { useState } from "react";
import logo from "../images/MemeCollectorLogo.png"
import { BsArrowBarRight } from "react-icons/bs";

interface StoreDrawCardsProps {
  drawnCards: Card[];
  onClose: () => void;
}

function StoreDrawCards({ drawnCards, onClose }: StoreDrawCardsProps) {
  const [hiddenCards, setHiddenCards] = useState<boolean[]>(
    Array(drawnCards.length).fill(true)
  );

  const revealCard = (index: number) => {
    setHiddenCards((prevHiddenCards) => {
      const newHiddenCards = [...prevHiddenCards];
      newHiddenCards[index] = false;
      return newHiddenCards;
    });
  };

  return (
    <div className="store-draw">
      <h3 className="store-draw__h3">Check what memes you got:</h3>
      <div className="store-draw__cards">
        {drawnCards.map((card, index) => (
          <button
            key={card.id}
            className="store-draw__card"
            onClick={() => revealCard(index)}
          >
            <div
              className={`store-draw__visible-card ${
                hiddenCards[index] ? "store-draw__hidden" : "store-draw__show"
              }`}
            >
              <div className="store-draw__image-container">
              <img
                src={card.image}
                alt={card.name}
                className="store-draw__image"
              />
              </div>
              <p className="store-draw__name">{card.name}</p>
              <p className="store-draw__tier">{card.rarity} Tier</p>
            </div>
            {hiddenCards[index] && (
              <div className="store-draw__hidden-overlay">
                <img className="store-draw__hidden-overlay-image" src={logo} alt="meme collector logo" />
              </div>
            )}
          </button>
        ))}
      </div>
      <button className="store-draw__confirm" onClick={onClose}>Collect Cards <BsArrowBarRight /></button>
    </div>
  );
}

export default StoreDrawCards;
