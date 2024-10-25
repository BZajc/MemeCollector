import {
  GiTwoCoins,
  GiCardAceClubs,
  GiCardRandom,
  GiCardboardBox,
} from "react-icons/gi";
import {
  TbCircleLetterC,
  TbCircleLetterB,
  TbCircleLetterA,
  TbCircleLetterS,
} from "react-icons/tb";
import cpreview from "../images/cards/c/c-hawk-tuah.webp";
import bpreview from "../images/cards/b/b-anthony-adams.webp";
import apreview from "../images/cards/a/a-this-is-fine.webp";
import spreview from "../images/cards/s/s-shrek-in-the-swamp.webp";
import StorePopup from "./StorePopup";
import { useState } from "react";

function Store() {
  // Cards packs displayed in the shop
  const cardPacks = [
    {
      name: "C TIER",
      image: cpreview,
      alt: "C Tier card preview",
      description: "Bunch of crap memes for everyone",
      chance: "90% C Tier, 10% B Tier",
      icon: <TbCircleLetterC />,
      price: 100,
    },
    {
      name: "B TIER",
      image: bpreview,
      alt: "B Tier card preview",
      description: "Accessible memes at an accessible price",
      chance: "22% C Tier, 75% B Tier, 3% A Tier",
      icon: <TbCircleLetterB />,
      price: 2500,
    },
    {
      name: "A TIER",
      image: apreview,
      alt: "A Tier card preview",
      description: "Cool memes",
      chance: "78% B Tier, 25% A Tier, 2% s Tier",
      icon: <TbCircleLetterA />,
      price: 15000,
    },
    {
      name: "S TIER",
      image: spreview,
      alt: "S Tier card preview",
      description: "Memes you'd show at the Christmas dinner table",
      chance: "85% A Tier, 15% S Tier",
      icon: <TbCircleLetterS />,
      price: 100000,
    },
  ];

  // State to manage which card popup is active
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  // Handler for showing the popup
  const handleShowPopup = (index: number) => {
    setActiveCardIndex(index);
  };

  // Handler for closing the popup
  const handleClosePopup = () => {
    setActiveCardIndex(null);
  };

  return (
    <div className="store">
      <div className="store__wrapper">
        <h2 className="store__h2">GAME SHOP</h2>
        <div className="store__section-container">
          <button className="store__section-standard">
            <GiCardRandom className="store__section-icon" /> Standard
          </button>
          <button className="store__section-collection">
            <GiCardboardBox className="store__section-icon" /> Collection
          </button>
          <button className="store__section-gift">
            <GiCardAceClubs className="store__section-icon" /> Free
          </button>
        </div>
        <h3 className="store__cards-sub-section-name">Default</h3>
        <div className="store__cards-container">
          {/* Render Cards */}
          {cardPacks.map((pack, index) => (
            <div key={index} className="store__card">
              <button
                className="store__card-preview-container"
                onClick={() => handleShowPopup(index)}
              >
                <img
                  src={pack.image}
                  alt={pack.alt}
                  className="store__card-preview"
                />
                <div className="store__card-preview-overlay">
                  <p className="store__card-preview-overlay-text">
                    {pack.name}
                  </p>
                </div>
              </button>
              <div className="store__card-info-container">
                <div className="store__card-icon-box">{pack.icon}</div>
                <div className="store__card-info">
                  <div className="store__card-name">
                    <span style={{ color: "#51C7F6" }}>{pack.name}</span> Card
                    Pack
                  </div>
                  <div className="store__card-description">
                    {pack.description}
                  </div>
                  <div className="store__card-price">
                    price: {pack.price}{" "}
                    <GiTwoCoins className="store__card-price-icon" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Render StorePopup only if activeCardIndex is not null */}
        {activeCardIndex !== null && (
          <StorePopup
            name={cardPacks[activeCardIndex].name}
            description={cardPacks[activeCardIndex].description}
            chance={cardPacks[activeCardIndex].chance}
            onClose={handleClosePopup}
          />
        )}

        <h3 className="store__cards-sub-section-name">Another Sub Section</h3>
      </div>
    </div>
  );
}

export default Store;