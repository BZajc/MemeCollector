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
import { useState, useEffect, useRef } from "react";
import { cards, cardPacks, Card, CardPack } from "../data/cardsConfig";
import StoreDrawCards from "./StoreDrawCards";
import music from "../sounds/21 Christian Salyer - Habib's Lucky Ganesh All-American Market.mp3";

function Store() {
  // State to manage which card popup is active
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [showDrawCards, setShowDrawCards] = useState<boolean>(false);
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);
  const [volume, setVolume] = useState<number>(0);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  // Cards packs displayed in the shop
  const getImageForPack = (name: string) => {
    switch (name) {
      case "C TIER Pack":
        return cpreview;
      case "B TIER Pack":
        return bpreview;
      case "A TIER Pack":
        return apreview;
      case "S TIER Pack":
        return spreview;
      default:
        return "";
    }
  };

  const getIconForPack = (name: string) => {
    switch (name) {
      case "C TIER Pack":
        return <TbCircleLetterC />;
      case "B TIER Pack":
        return <TbCircleLetterB />;
      case "A TIER Pack":
        return <TbCircleLetterA />;
      case "S TIER Pack":
        return <TbCircleLetterS />;
      default:
        return null;
    }
  };

  // Handler for showing the popup
  const handleShowPopup = (index: number) => {
    setActiveCardIndex(index);
  };

  // Handler for closing the popup
  const handleClosePopup = () => {
    setActiveCardIndex(null);
  };

  // Get random rarity
  function getRandomRarity(chances: {
    [key in Card["rarity"]]?: number;
  }): Card["rarity"] {
    const random = Math.random() * 100;
    let cumulative = 0;

    for (const [rarity, chance] of Object.entries(chances)) {
      cumulative += chance!;
      if (random < cumulative) return rarity as Card["rarity"];
    }
    return "C";
  }

  // Handle Card Pack Confirm Selection
  const handleConfirmSelection = () => {
    if (activeCardIndex !== null) {
      drawCards(cardPacks[activeCardIndex]);
    }
    setActiveCardIndex(null);
    setShowDrawCards(true);
  };

  // Get 5 random cards
  function drawCards(pack: CardPack) {
    const selectedCards: Card[] = [];

    while (selectedCards.length < 5) {
      const rarity = getRandomRarity(pack.chances);
      const availableCards = cards.filter((card) => card.rarity === rarity);

      // Get random card
      const randomCard =
        availableCards[Math.floor(Math.random() * availableCards.length)];

      // Avoid duplicated cards
      if (!selectedCards.some((card) => card.id === randomCard.id)) {
        selectedCards.push(randomCard);
      }
    }

    setDrawnCards(selectedCards);
  }

  const handleCloseDrawCards = () => {
    setShowDrawCards(false);
  };

  useEffect(() => {
    backgroundMusicRef.current = new Audio(music);
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = volume;
    backgroundMusicRef.current.play();

    return () => {
      backgroundMusicRef.current?.pause();
      backgroundMusicRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="store">
      <div className="store__wrapper">
        <h2 className="store__h2">GAME SHOP</h2>
        <div className="store__slider-box">
          <label htmlFor="volume-slider">Banger Volume:</label>
          <p>temporary solution</p>
          <input
            id="volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
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
        <h3 className="store__cards-sub-section-name">Classic Packs</h3>
        <div className="store__cards-container">
          {/* Render Cards */}
          {cardPacks.map((pack, index) => (
            <div key={index} className="store__card">
              <button
                className="store__card-preview-container"
                onClick={() => handleShowPopup(index)}
              >
                <img
                  src={getImageForPack(pack.name)}
                  alt={`${pack.name} preview`}
                  className="store__card-preview"
                />
                <div className="store__card-preview-overlay">
                  <p className="store__card-preview-overlay-text">
                    {pack.name}
                  </p>
                </div>
              </button>
              <div className="store__card-info-container">
                <div className="store__card-icon-box">
                  {getIconForPack(pack.name)}
                </div>{" "}
                <div className="store__card-info">
                  <div className="store__card-name">
                    <span style={{ color: "#51C7F6" }}>{pack.name}</span> Card
                    Pack
                  </div>
                  <div className="store__card-price">
                    price: {pack.price.toLocaleString("pl-PL")}{" "}
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
            chances={cardPacks[activeCardIndex].chances}
            onClose={handleClosePopup}
            onConfirm={handleConfirmSelection}
          />
        )}

        {/* Render new background after confirming card pack selection */}
        {showDrawCards && (
          <StoreDrawCards
            drawnCards={drawnCards}
            onClose={handleCloseDrawCards}
          />
        )}

        <h3 className="store__cards-sub-section-name">Another Sub Section</h3>
      </div>
    </div>
  );
}

export default Store;
